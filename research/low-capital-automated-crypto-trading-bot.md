# Designing and building a realistic low-capital automated crypto trading bot

## Executive summary

A near “set-and-forget” automated crypto bot that starts with **~$100** is feasible to build, but it must be designed around the reality that **transaction costs (fees + spread + slippage) and minimum order constraints are a first-order problem** at that account size. For most retail accounts, the most robust approach is **low turnover**, **high-liquidity pairs only**, and **hard-coded risk controls** that prioritise survival and avoiding “death by a thousand cuts”. The literature on financial backtests is also clear that naive optimisation and “indicator soup” often produces backtests that fail out-of-sample; a rigorous walk-forward and cost model is essential. citeturn8search0turn8search4

The most implementable strategy families for $100 are:

- **Low-frequency cross-sectional momentum / trend-following rotation** (daily/4‑hour signals; hold for days to weeks). Crypto research finds meaningful **momentum effects** in the cross-section of cryptocurrency returns, especially among smaller assets (with higher risk and higher cost sensitivity). citeturn1search4turn1search0  
- **Regime-filtered mean-reversion swing trades** (trade only when the market is ranging and liquidity is high; hold hours to days). This reduces the classic mean-reversion failure mode in strongly trending markets. Regime-switching behaviour (especially in volatility) is a documented feature of Bitcoin and broader crypto markets. citeturn9search13turn9search12

Strategies that are usually *not* realistic for $100 as “set-and-forget”:

- **Market-making** on centralised exchanges (CEXs) is highly competitive and extremely sensitive to spreads, queue position, latency, and adverse selection; it can be educational, but it is rarely “hands-off profit” at low capital. The canonical market-making model papers focus on an inventory-risk optimisation problem; the gap from theory to retail CEX conditions is large. citeturn10search0turn10search2turn1search1  
- **Statistical arbitrage and cross-exchange arbitrage** require reliable shorting, fast and predictable transfers, and careful operations. Research on arbitrage in Bitcoin across exchanges suggests opportunities depend on conditions like **volatility and network congestion**, and can be episodic. citeturn1search3

**Realistic return/risk ranges for $100 (net of fees/slippage, no leverage, high-liquidity spot pairs):**
- “Good month” ranges for robust low-turnover strategies are often **~0% to +5%**, but drawdowns of **−10% to −30%** can occur in adverse regimes if risk limits are weak (especially in smaller coins). Momentum-style strategies can carry substantial crash risk in reversals; mean-reversion can be steamrolled in trends. citeturn1search4turn9search13  
- A practical design target for a realistic, implementable system is **low-to-moderate turnover** with an aim of **~0–3% per month** *on average* over long samples, with the expectation of multi-month flat/down periods.

The report below provides: prioritised strategy candidates and expected ranges; concrete entry/exit rules using your dashboard fields; regime detection; cost/slippage modelling; execution tactics and exchange selection; a rigorous backtesting methodology; pseudocode for two top strategies; parameter sets and a tuning plan; infrastructure and a deployment checklist; and a 6–12 month timeline.

## Strategy selection and realistic expectations

### Strategy comparison for a $100 “near set-and-forget” bot

The key driver of “set-and-forget” feasibility at $100 is **turnover**: the more frequently you trade, the more your edge must exceed fees/spread/slippage. Maker/taker price formation and order book liquidity are central to these costs. citeturn0search5turn1search1turn10search15

| Strategy family | Typical holding period | Turnover | Operational complexity | Cost sensitivity | Suitability for $100 | Realistic net outcome ranges (monthly / annual) |
|---|---:|---:|---:|---:|---:|---|
| Cross-sectional **momentum / trend rotation** (spot, no leverage) | Days–weeks | Low–medium | Medium | Medium | **High** | ~0% to +5% / ~0% to +30% (high variance; can be negative) citeturn1search4turn1search0 |
| **Breakout / trend-following** (single or few pairs) | Days–weeks | Low | Low–medium | Medium | High | Similar to momentum; depends heavily on regime/trend persistence citeturn9search13 |
| **Mean reversion** (RSI/z-score style) with regime filter | Hours–days | Medium | Medium | High | Medium | ~−5% to +5% / ~−30% to +20% (works in ranges; fails in trends) citeturn9search13turn9search12 |
| **Market-making** (two-sided quotes) | Seconds–minutes | High | High | **Very high** | Low | Often negative after adverse selection unless you have real advantages (latency, rebates, book modelling) citeturn10search0turn10search2turn1search1 |
| **Statistical arbitrage** (pairs / cointegration) | Days–weeks | Medium | High | Medium | Low–medium | Mixed; requires robust modelling, (often) shorting, and regime stability citeturn1search3turn1search7turn1search19 |
| **Cross-exchange arbitrage** | Minutes–hours | Medium–high | Very high | Medium | Low | Episodic; exposed to transfer delays, withdrawal fees, and operational risk citeturn1search3 |

### Prioritised candidate strategies with realistic return and risk ranges

For a $100 starter bot, the best “implementability-to-robustness” ratio comes from **(A) cross-sectional momentum rotation** and **(B) mean-reversion only when in a range regime**.

#### Candidate strategy set ranked by practicality
1. **Regime-filtered cross-sectional momentum rotation (spot, no leverage)**  
   - Why it’s plausible: crypto exhibits cross-sectional momentum and size-related effects; systematic sorting/selection approaches are documented in the literature. citeturn1search4turn1search0  
   - What makes it set-and-forget: **trade infrequently** (e.g., daily or 4‑hourly checks; positions held for days), and embed strict risk gates and “do nothing” logic.

2. **Range-only mean-reversion swing strategy (RSI + reversion score + liquidity filters)**  
   - Why it’s plausible: crypto markets show regime behaviour; mean-reversion rules should be turned *off* in strong trend regimes. citeturn9search13turn9search12  
   - What makes it implementable: order types and risk controls are straightforward; the main challenge is preventing trend-regime trading.

3. **Breakout strategy with volume confirmation (single/few pairs)**  
   - Why it’s plausible: breakout/trend rules can perform in trending regimes; operationally simple.  
   - Why it’s not top‑2: it’s often similar to momentum, but can suffer whipsaw unless tuned carefully and filtered by regime/volatility. citeturn9search13

4. **Market-making (educational only, not “set-and-forget profit” at $100)**  
   - Why it’s hard: fills and profitability are dominated by microstructure effects, inventory risk, and adverse selection; the classic model formalises the risk/utility trade-off but does not grant a free edge. citeturn10search0turn1search1  
   - If attempted: treat as a research project, not income. Use dedicated frameworks and start in simulation. citeturn10search2turn2search18

### Exchange and regulatory context for Australians
Exchange rules, product availability, and legal constraints can materially affect what your bot can do. For example, in Australia recent regulatory enforcement actions and product disclosures emphasise onboarding, consumer protections, and restrictions around derivatives access. citeturn4search1turn16view0  
Also, digital currency exchange providers must be registered in Australia and the AML/CTF framework is expanding; this matters for operational continuity and KYC/transfer friction. citeturn4search15turn4search11

## Turning your dashboard features into trades

You provided a dashboard schema:

**SYMBOL, TIER, SCORE, PRICE, 24H%, 7D%, VOLUME24H, RSI(14), MOMENTUM, REVERSION, BREAKOUT, STRUCTURE, CROSS‑SEC, VOL RATIO, 1CHZA**

Because the exact scale/definition of **MOMENTUM / REVERSION / BREAKOUT / STRUCTURE / CROSS‑SEC / 1CHZA** appears custom, the most robust design treats them as **monotonic scores** (higher means “more of that property”) and converts them into actions via: (1) **filters** (hard eligibility), (2) **ranking** (choose best candidates), and (3) **thresholds** (enter/exit gates). This is safer than trying to map them into continuous position sizes immediately (a common overfitting trap). citeturn8search0turn8search4

### Feature-to-signal mapping

| Dashboard field | Practical interpretation | How to use it in a bot |
|---|---|---|
| SYMBOL | Tradable instrument identifier | Universe membership; map to exchange market symbol; enforce tradability via exchange metadata (min notional, step size). citeturn2search3turn7search1 |
| TIER | Your liquidity/cap/quality bucket | Hard filter: only trade high-liquidity tiers for $100; also drives max number of concurrent positions. |
| SCORE | Composite rank | Use as *candidate ranking only*, not a direct trade trigger. Combine with regime filters. |
| PRICE | Last/mid price | Used for sizing; also used to infer “stable-like” assets (≈1) to exclude from momentum systems. |
| 24H% | Short-horizon return | Pullback detector for trend entries; shock detector for reversion entries. |
| 7D% | Medium-horizon return | Core momentum/trend filter; also used to avoid “catching falling knives” in reversion. |
| VOLUME24H | Liquidity proxy | Hard filter to reduce slippage; used to weight/rank candidates. Slippage is strongly tied to liquidity and volatility. citeturn1search1turn10search15 |
| RSI(14) | Momentum oscillator | Classic overbought/oversold trigger for mean reversion; also trend-health filter (avoid buying “overheated” momentum at RSI extremes). |
| MOMENTUM | Custom trend strength score | Use as ranking within the trend regime; cross-check against 7D%. |
| REVERSION | Custom mean-reversion propensity | Use only when range regime; require supportive RSI/24H% patterns. |
| BREAKOUT | Custom breakout propensity | Entry gate for breakout regime; require high VOL RATIO and positive STRUCTURE. |
| STRUCTURE | “Market structure” / trend integrity | Central to regime detection (trending vs ranging) at the asset level; avoid reversion trades when STRUCTURE indicates a strong trend. |
| CROSS‑SEC | Relative strength vs universe | Use for cross-sectional ranking; avoid trading assets with weak relative strength in trend regime. Momentum effects are documented cross-sectionally in crypto. citeturn1search4turn1search0 |
| VOL RATIO | Current volume / baseline volume | Confirmation signal (breakouts need participation); also a “do not trade” signal when very low (liquidity risk). |
| 1CHZA | Ambiguous (likely “1‑hour change z-score” or “1‑hour choppiness/vol anomaly”) | Treat as a short-horizon volatility/shock indicator: (a) avoid chasing spikes; (b) require normalisation after shocks before mean‑reversion entries. (Document and validate this definition in your own data pipeline.) |

### Regime detection design

A robust bot typically needs two layers of regime detection:

1. **Market-wide regime** (risk-on trend vs risk-off chop/high-vol)  
2. **Asset-specific regime** (this coin is trending vs ranging)

Crypto shows regime changes in volatility dynamics; regime-switching GARCH/HMM approaches are used in the literature, but a “set-and-forget” retail system usually prefers simpler proxies. citeturn9search13turn9search12

**Implementable market-wide regime features (computed daily):**
- **Breadth**: median 24H% and 7D% across your eligible universe; % of coins above 7D% > 0.  
- **Correlation / clustering**: average pairwise correlation of 1D returns (high correlation often means “beta-driven” regime; many alts move together). citeturn9search5  
- **Volatility**: realised volatility of a benchmark (e.g., BTC/USDT) or of the universe median; volatility modelling and clustering are well-documented for Bitcoin. citeturn9search3turn9search13

**Asset-specific regime proxies (computed on 4H/1D candles):**
- STRUCTURE score (from your dashboard) as a primary proxy.
- RSI zone behaviour: persistent RSI>50 supports trend; RSI oscillating around 50 suggests range.
- Breakout vs reversion score dominance: BREAKOUT ≫ REVERSION suggests trend; the inverse suggests range.

A practical, implementable definition:

- **Trend regime (market-wide)** if:  
  (i) breadth is positive (e.g., >55% of universe has 7D% > 0), and  
  (ii) realised vol is not extreme (avoid trend entries during crash spikes), and  
  (iii) benchmark trend measure is positive (e.g., price above 20D MA).

- **Range regime** otherwise.

This design echoes what the regime-switching literature formalises (latent states), but in a way you can implement robustly with only OHLCV + your feature dashboard. citeturn9search12turn9search13

### Top strategy rules with pseudocode

#### Strategy one: regime-filtered cross-sectional momentum rotation

**Intent:** hold 1–3 positions; rebalance daily (or every 4H); trade only high-liquidity tiers; avoid stablecoins. Grounded in documented cross-sectional momentum effects in crypto, while acknowledging high risk and non-stationarity. citeturn1search4turn1search0turn8search0

**Core entry logic (trend regime only):**
- Universe filter: TIER in {A,B} (or your top tiers); VOLUME24H above threshold; exclude PRICE ≈ 1 (stablecoin-like); exclude symbols with known transfer/trade restrictions.
- Candidate ranking score example:  
  `rank_score = w1*CROSS_SEC + w2*MOMENTUM + w3*BREAKOUT + w4*STRUCTURE + w5*VOL_RATIO`  
  (weights should be simple and stable; avoid complex ML first).
- “Buy the pullback in an uptrend” gate: require 7D% > +x, 24H% between −a and +b (small pullback preferred), RSI between 40 and 65.

**Exit logic:**
- Time-based exit: max hold N days (e.g., 14–28) to reduce tail risk and regime drift.
- Price-based exit: trailing stop based on ATR or %; also exit if STRUCTURE collapses or CROSS‑SEC rank drops below threshold.
- Portfolio-level exit: if market regime turns to risk-off, reduce positions to 0–1 and tighten stops.

**Pseudocode (high-level)**

```text
daily_cycle():
  load_dashboard_snapshot()

  eligible = []
  for asset in snapshot:
    if asset.TIER not in ALLOWED_TIERS: continue
    if asset.VOLUME24H < MIN_VOLUME_USD: continue
    if is_stable_like(asset): continue
    if asset.market_is_paused_or_delisted: continue
    eligible.append(asset)

  market_regime = compute_market_regime(snapshot, benchmark_ohlcv)

  # Hard risk guardrails
  if equity_drawdown > MAX_DRAWDOWN: liquidate_all(); halt_trading()
  if last_24h_loss > DAILY_LOSS_LIMIT: halt_new_entries()

  # Manage existing positions first
  for pos in open_positions:
    update_trailing_stop(pos)
    if exit_signal(pos, snapshot[pos.symbol], market_regime):
       place_exit_order(pos)

  if market_regime != "TREND":
    return  # in non-trend regime, do not open momentum entries

  # Rank candidates
  for asset in eligible:
    asset.rank_score = w1*asset.CROSS_SEC + w2*asset.MOMENTUM + w3*asset.BREAKOUT \
                       + w4*asset.STRUCTURE + w5*log(1 + asset.VOL_RATIO)

  candidates = top_k_by_rank_score(eligible, K)

  # Entry gates: avoid buying parabolic spikes, prefer controlled pullbacks
  for asset in candidates:
    if asset.RSI14 < RSI_MIN or asset.RSI14 > RSI_MAX: continue
    if asset.SevenDayPct < MIN_7D_MOM: continue
    if asset.TwentyFourHourPct < MIN_24H_PULLBACK or asset.TwentyFourHourPct > MAX_24H_MOVE: continue
    if count(open_positions) >= MAX_POSITIONS: break

    order_size = position_size_for_100_dollars(equity, asset, stops_model)
    place_post_only_limit_buy(asset.symbol, order_size, price=mid_price_minus_offset)
    attach_stop_and_trailing_logic(asset.symbol)
```

#### Strategy two: range-only mean-reversion swing trades

**Intent:** capture rebounds from short-term oversold conditions, but only when the market and the asset appear *range-bound*. Regime control is the main “make or break”. Regime switching and volatility clustering are documented in Bitcoin/crypto; simple proxies can serve as robust approximations. citeturn9search13turn9search12

**Core entry logic (range regime only):**
- Universe filter stricter than trend strategy: require higher VOLUME24H and tighter spreads (use your tiering).
- Entry conditions example:  
  - RSI(14) < 30–35  
  - REVERSION score above threshold  
  - STRUCTURE below threshold (avoid trending assets)  
  - 24H% is sharply negative (capitulation) but 7D% not catastrophically negative (avoid prolonged downtrends)  
  - VOL RATIO not extremely low (avoid illiquid “dead cat” bounces)

**Exit logic:**
- Mean reversion target: exit when RSI crosses 45–55 or price returns to a moving average/VWAP proxy.
- Hard stop: exit on −x% or ATR-based stop.
- Max holding time: 24–72 hours (mean reversion edges often decay quickly; holding longer can become trend risk).

**Pseudocode (high-level)**

```text
intraday_cycle(every_4_hours):
  snapshot = load_dashboard_snapshot()
  market_regime = compute_market_regime(snapshot, benchmark_ohlcv)

  if market_regime != "RANGE":
    return  # do not mean-revert in trend regimes

  # Risk guardrails
  if equity_drawdown > MAX_DRAWDOWN: liquidate_all(); halt_trading()
  if last_24h_loss > DAILY_LOSS_LIMIT: halt_new_entries()

  # Exit logic for open positions
  for pos in open_positions:
    a = snapshot[pos.symbol]
    if pos.unrealised_pnl <= -STOP_LOSS_PCT: place_exit_order(pos)
    if a.RSI14 >= RSI_EXIT: place_exit_order(pos)
    if pos.holding_time_hours >= MAX_HOLD_HOURS: place_exit_order(pos)

  # Entry scanning
  for asset in snapshot:
    if asset.TIER not in STRICT_TIERS: continue
    if asset.VOLUME24H < HIGH_MIN_VOLUME: continue
    if is_stable_like(asset): continue
    if asset.STRUCTURE > STRUCTURE_MAX_FOR_RANGE: continue

    oversold = (asset.RSI14 <= RSI_ENTRY) and (asset.REVERSION >= REV_SCORE_MIN)
    shock_ok = (asset.TwentyFourHourPct <= NEG_24H_MIN) and (asset.SevenDayPct >= NEG_7D_FLOOR)
    liquidity_ok = (asset.VOL_RATIO >= VOL_RATIO_MIN)

    if oversold and shock_ok and liquidity_ok:
       size = small_account_size(equity, asset, stop=STOP_LOSS_PCT)
       place_limit_buy_with_timeout(asset.symbol, size)
       # Consider stop-loss either as exchange-native (if supported) or bot-managed
```

### Parameter sets to test and a hyperparameter tuning plan

A realistic tuning plan must explicitly fight **backtest overfitting** and ensure your chosen parameters survive multiple market regimes. citeturn8search0turn8search4

#### Initial parameter grids (small, interpretable)
**Strategy one (momentum rotation):**
- Rebalance: {daily, 12h, 4h}
- MAX_POSITIONS: {1, 2, 3}
- MIN_VOLUME_USD (24H): choose by your tier: e.g., {20M, 50M, 100M}
- RSI entry band: {40–65, 45–70}
- 7D momentum floor: {+3%, +5%, +8%}
- 24H pullback gate: {−8% to +6%, −5% to +4%}
- Trailing stop (percent): {6%, 8%, 10%, 12%}
- Max hold: {14d, 21d, 28d}

**Strategy two (range mean reversion):**
- RSI entry: {25, 30, 35}
- RSI exit: {45, 50, 55}
- STOP_LOSS_PCT: {4%, 6%, 8%, 10%}
- MAX_HOLD_HOURS: {24, 48, 72}
- STRUCTURE_MAX_FOR_RANGE: test quantiles (e.g., bottom 40% / 50%)
- REVERSION threshold: test quantiles (top 20% / 30% / 40%)
- VOL_RATIO_MIN: {0.8, 1.0, 1.2}

#### Walk-forward + “single true out-of-sample” protocol
A rigorous, implementable procedure:

1. Split history into:
   - **Development window** (e.g., first 60–70%): for research and model shaping  
   - **Validation windows** (rolling walk-forward): for parameter selection  
   - **Final holdout** (last 20–30%): never touched until the end  
2. For each walk-forward step:
   - Train/optimise on a rolling window (e.g., 6 months), test on next window (e.g., 1 month)
   - Limit the number of parameter trials (avoid thousands of combinations)
3. Use robust objectives:
   - Net return *and* maximum drawdown limits  
   - Conservative cost model (fees + slippage)  
4. After selecting a final configuration, run it **once** on the holdout.

This approach is consistent with the backtest-overfitting research (which shows that trying many strategies/parameters on finite data makes disappointment likely unless controlled), and with current walk-forward research that highlights how performance depends on window choice and cost assumptions. citeturn8search0turn8search2

## Risk, costs, and execution on $100

### Position sizing constraints for $100

With $100, sizing is constrained by:
- **Exchange minimums and increments** (min notional, step size). On some exchanges, these rules are formalised as filters (e.g., MIN_NOTIONAL and LOT_SIZE on Binance) and you must comply programmatically to avoid rejected orders. citeturn2search3turn6search3  
- **Minimum order sizes**: e.g., Kraken documents minimum trade volumes by base currency (and separately notes smaller minimums for “buy crypto” flows), which can matter for small accounts. citeturn6search0turn11view0  
- **Portfolio concentration**: you cannot realistically hold 10 positions; your bot will likely run **1–3 positions**.

A pragmatic sizing policy for a $100 bot (spot, no leverage):
- MAX_POSITIONS = 2 (start), later 3 only if fills are consistent and costs stay low.
- Target notional per entry = **$25–$50** (ensures orders clear typical minimum notionals, while avoiding 100% concentration).
- Risk-per-trade approach: if your stop is 8% and you allocate $40, worst-case loss ≈ $3.20 (3.2% of equity). That is high, but often unavoidable at $100 unless you accept smaller orders and higher rejection risk.

### Fees and slippage modelling

**Maker/taker matters.** Market orders and immediately-fillable limits are takers; resting limit orders are makers. citeturn0search2turn0search5

At $100, you need a cost model that’s conservative enough to survive real trading:
- **Fees:** use your exchange’s published maker/taker schedule.  
- **Spread/slippage:** for OHLCV backtests, approximate it with a per-side bps assumption that increases when liquidity is lower and volatility is higher—this is consistent with how order book liquidity relates to spread and execution cost. citeturn1search1turn10search15  
- **Stress-test costs:** run backtests at 1×, 2×, and 3× your base slippage assumption; cost sensitivity analysis is an explicit sanity check used in walk-forward research. citeturn8search2

#### Fee impact table (illustrative)
Example assumptions: $100 equity, $50 notional per trade, 0.10% slippage per side (conservative), round-trips per month as shown. Fee rates are taken from published schedules/examples; your realised fees depend on tier, order types, and venue. citeturn13view0turn12view0turn0search18turn16view1

| Venue fee example | Fee rate (per side) | 10 round-trips / month cost (as % of equity) | 20 round-trips / month cost | Interpretation for $100 |
|---|---:|---:|---:|---|
| Low-fee taker (e.g., 0.10%) | 0.10% | ~2% | ~4% | Still meaningful: your strategy edge must exceed several %/month to justify high turnover. citeturn13view0 |
| Maker 0.40% (low-volume tier) | 0.40% | ~5% | ~10% | Many “small edges” die; you must trade very infrequently or avoid the venue for small accounts. citeturn12view0 |
| Taker 0.60% (upper bound stated) | 0.60% | ~7% | ~14% | High-fee environments strongly push you toward very low turnover or not trading. citeturn0search18 |
| Low-fee example 0.08–0.10% | 0.10% | ~2% | ~4% | Comparable to 0.10% venues; still demands low turnover and good liquidity selection. citeturn16view1 |

### Exchange selection, APIs, and execution tactics

Below is a comparison focused on: (a) fee drag for small accounts, (b) API quality and market data availability, and (c) practical constraints for automated trading.

| Exchange | Spot fee reference | Minimums / constraints | API and market data notes | Relevance to a $100 bot |
|---|---|---|---|
| **entity["company","Binance","crypto exchange"]** | Public spot schedule shows 0.10% / 0.10% for regular users (maker/taker), with discounts for fee programmes. citeturn13view0 | Symbol-specific filters such as MIN_NOTIONAL and LOT_SIZE are exposed via `/exchangeInfo`; bots must validate before placing orders. citeturn2search3turn6search3 | Public historical data is available via Binance Data Collection and a public-data repo (daily/monthly files). citeturn5search0turn5search12 | Strong for cost modelling and data availability; ensure your bot can handle symbol filters and delistings robustly. citeturn2search7 |
| **entity["company","Kraken","crypto exchange"]** | Kraken Pro spot fee schedule shows low-volume tiers (e.g., $0+ maker 0.40%, taker 0.80%) and lower tiers at higher volume. citeturn12view0 | Kraken publishes minimum trade volumes by base currency; small-account usability depends on pair and minimums. citeturn6search0 | Kraken supports REST/WebSocket APIs with published rate-limit guidance. citeturn5search1turn5search5 | High published base fees can be punitive at $100 unless you trade rarely; still valuable if you strongly prefer Kraken’s ecosystem and can keep turnover very low. citeturn12view0 |
| **entity["company","Coinbase","crypto exchange company"]** | Official help docs describe maker/taker and reference fee tiers; another Coinbase help page states fees ≤0.4% maker and ≤0.6% taker (volume-based). citeturn0search2turn0search18 | Minimum trade sizes vary by product; product endpoints expose min/max size fields such as `base_min_size` and `min_market_funds`. citeturn7search1turn7search4 | Advanced Trade API offers REST + WebSocket; WebSocket includes a “level2” channel aimed at keeping an order book snapshot in sync, with explicit rate limits. citeturn5search14turn5search11turn5search10 | Good API ergonomics; fee levels may be higher than lowest-fee venues, so this favours low turnover and limit-first execution. citeturn0search18 |
| **entity["company","OKX","crypto exchange"]** | OKX publishes fee rules and examples showing spot maker/taker fee calculations (example: 0.08% maker, 0.1% taker). citeturn16view1 | Product and minimum size fields are available via OKX API docs; minimum order quantities may change per announcement. citeturn6search18turn6search6 | Australia disclosures note derivatives and margin intended for wholesale clients; spot/DCE services are described separately. citeturn16view0 | Potentially strong on fees (depending on tier); ensure you design for spot-only unless you’re eligible for derivatives access. citeturn16view0turn16view1 |

#### Execution tactics that make a $100 bot viable
- Prefer **post-only limit orders** where possible to avoid taker fees and reduce slippage, but manage fill risk with a timeout and controlled “chase” logic. Maker/taker fee definitions and post-only mechanics are explicitly documented by exchanges. citeturn0search5turn7search3  
- Always validate symbol rules before order placement: min notional, step size, tick size, max order count. Binance exposes these as filters; similar constraints exist across venues via product metadata. citeturn2search3turn7search1  
- Use exchange-native conditional orders if available (stop-loss / take-profit) or emulate them with a bot-managed stop that is continuously monitored. Several venues document stop loss and OCO-style workflows and their trade-offs (fill certainty vs price control). citeturn2search11turn2search19  
- For “set-and-forget”, prefer a **single exchange** initially. Cross-exchange routing increases operational and reconciliation risk significantly and is rarely worth it at $100. citeturn1search3

## Backtesting, validation, live testing, and monitoring

### Backtesting methodology that avoids common traps

A credible backtest process should directly respond to the research on backtest overfitting: the more strategies/parameters you try, the more likely you are to select noise unless you constrain the search and validate out-of-sample. citeturn8search0turn8search4

**Minimum recommended backtest structure:**
- Data horizon: **at least 2–4 years** of history when available, covering multiple crypto regimes (bull, bear, high-vol shock, low-vol chop). This matters because regime switching is a documented property in crypto volatility and returns. citeturn9search13turn9search5  
- Walk-forward evaluation: rolling training/testing windows, then a final untouched holdout. citeturn8search2  
- Conservative transaction cost model: include maker/taker fees and slippage/spread; crypto execution costs depend on liquidity and volatility and must not be ignored. citeturn1search1turn10search15

### Data sources and timeframes

You can backtest using either:
- **Exchange-provided historical data** (preferred when possible for consistency with execution venue), and/or  
- Vendor data (often paid) for consolidated multi-venue history.

Examples of official exchange data access:
- Binance provides a public “Data Collection” site and a public-data repository describing daily and monthly files (including notes like timestamp format changes). citeturn5search0turn5search12  
- Coinbase provides API endpoints for product candles and warns historical rates can be incomplete for intervals without ticks; it directs developers toward trade/book endpoints + WebSocket for real-time. citeturn5search15turn5search22

A pragmatic approach:
- Use OHLCV for the first-stage strategy research (with conservative slippage assumptions).
- If you pursue market-making or intraday execution improvements, upgrade to trade-level and order-book data (e.g., WebSocket level2 feeds). Coinbase’s docs describe a level2 channel designed for maintaining an order book snapshot. citeturn5search11turn5search3

### Transaction cost model for backtests

A practical model for $100 bots:

- **Fees:** per-side maker or taker, from the schedule for your expected tier. citeturn13view0turn12view0turn0search18turn16view1  
- **Slippage proxy (bps per side):**  
  `slippage_bps = base_bps + vol_component + illiquidity_component`  
  where illiquidity is inversely related to VOLUME24H and your VOL RATIO. This aligns with the link between liquidity (spread) and trading cost. citeturn1search1turn10search15  
- **Stress tests:** multiply slippage by 2× and 3×; require profitability to partially survive.

If you implement order-book simulation:
- Estimate fill probability and market impact using order book depth; microstructure research on spreads and liquidity provides grounding for why this matters. citeturn1search1turn10search0  
- For more advanced execution modelling, classic optimal execution frameworks (e.g., Almgren–Chriss) formalise the trade-off between impact and variance risk, though they are not crypto-specific. citeturn8search3

### Live testing and monitoring plan

**Staging steps:**
1. Backtest with full costs and walk-forward.
2. Paper trade with live market data and your execution logic (including timeouts, partial fills, rejected order handling).
3. “Micro-live” with $100 and strict kill switches.

**What to monitor (minimum telemetry):**
- Order lifecycle: submitted → acknowledged → partial fill → full fill → cancel/replace.  
- Slippage: realised vs predicted; slippage spikes often reflect liquidity shocks. citeturn10search15  
- Fill quality: maker vs taker share; post-only rejection rate; timeout rate.
- Risk and exposures: realised/unrealised PnL, drawdown, concentration, holding time distribution.
- Regime classifier outputs: how often you trade each regime; regime flip frequency.

**Metrics that are meaningful for small bots:**
- Expectancy per trade (net of fees), win rate, average win/loss, payoff ratio.
- Max drawdown and time-to-recover.
- Turnover and cost ratio: total fees+slippage paid ÷ gross profit.
- “Live-minus-backtest delta”: systematic drift between simulated and real fills.

### Failure modes to design around

The failure modes below are disproportionately common in retail bots and especially lethal at $100:

- **Backtest overfitting**: selecting a parameter set that wins in-sample and fails live; extensively documented in the quantitative finance literature. citeturn8search0turn8search4  
- **Ignoring regime switching**: mean reversion systems can be destroyed in trend regimes; crypto volatility regimes are documented. citeturn9search13turn9search12  
- **Cost underestimation**: under-modelling spread/slippage/fees; liquidity and volatility drive trading costs. citeturn1search1turn10search15  
- **Exchange/operational risk**: outages, API changes, delistings, or product restrictions. Exchange rules and constraints (filters, rate limits) are real and must be coded defensively. citeturn2search3turn5search1turn5search2  
- **Regulatory friction**: in Australia, product availability and onboarding requirements can change and enforcement actions occur; build for conservative assumptions (spot-only, no leverage) unless you have confirmed eligibility. citeturn4search1turn16view0  
- **Data quality and “feature drift”**: if your dashboard scores are computed by a separate system, any change in that system changes your strategy inputs; store versions and audit changes.

## Implementation plan, checklist, and timeline

### Required infrastructure and a sample tech stack

You can choose “framework-first” (fast, less custom) or “build-from-scratch” (more control). For near set-and-forget reliability, many builders start with a framework to reduce operational mistakes.

**Trading connectivity and bot frameworks:**
- **entity["organization","ccxt","crypto exchange api library"]** for multi-exchange connectivity (Python/JS/PHP) and basic market/trading access. citeturn2search0turn2search4  
- **entity["organization","Freqtrade","open-source crypto trading bot"]** (Python) for strategy scaffolding, backtesting, and hyperparameter optimisation in a bot-centric workflow. citeturn2search5turn2search13turn2search17  
- **entity["organization","Hummingbot","open-source trading framework"]** for market-making and connector-based trading; its docs include pure market making and cross-exchange market-making strategies. citeturn2search18turn10search2turn2search10

**Core infrastructure (minimal but robust):**
- Compute: VPS (Linux) or a small home server with UPS; Docker for reproducibility.
- Data store: PostgreSQL (preferred) or SQLite (acceptable for starting); store raw snapshots + derived features + orders + fills.
- Scheduling: cron/systemd timers or a lightweight orchestration layer.
- Monitoring: Prometheus + Grafana, or a hosted equivalent; alerting via email/Telegram.
- Secrets management: environment variables + encrypted secret store; exchange API key IP whitelisting (if supported).

**Exchange-specific integration details to account for:**
- Market metadata and minimums: symbol filters and product specs (e.g., Binance `/exchangeInfo` filters; Coinbase product min sizes fields). citeturn2search3turn7search1  
- Rate limits: Kraken and Coinbase publish guidance for REST/WebSocket limits; your bot must throttle and back off. citeturn5search1turn5search2turn5search10  
- WebSocket market data: Coinbase Advanced Trade WebSockets provide real-time market and user order feeds; its docs describe channel behaviour and limits. citeturn5search3turn5search11turn5search10

### Mermaid diagram for system architecture

```mermaid
flowchart LR
  subgraph DataLayer["Data & Feature Layer"]
    A[Exchange market data\n(OHLCV, trades, order book)] --> B[Ingestion & normalisation]
    B --> C[Feature compute\n(RSI, returns, scores, vol proxy)]
    C --> D[(Feature store / DB)]
    E[Your dashboard snapshot\n(SCORE, MOMENTUM, etc.)] --> C
  end

  subgraph StrategyLayer["Strategy & Risk Layer"]
    D --> F[Regime detection\n(market + asset)]
    F --> G[Signal engine\n(entry/exit candidates)]
    G --> H[Risk manager\n(sizing, limits, kill-switch)]
  end

  subgraph ExecutionLayer["Execution Layer"]
    H --> I[Order builder\n(limit/post-only, timeouts)]
    I --> J[Exchange API adapter\n(REST/WebSocket)]
    J --> K[(Orders & fills ledger)]
    K --> H
  end

  subgraph OpsLayer["Operations"]
    K --> L[Metrics & logs]
    L --> M[Monitoring & alerts]
    M --> N[Operator actions\n(pause/resume, config changes)]
  end
```

### Mermaid flowchart for trade lifecycle

```mermaid
flowchart TD
  S([Start cycle]) --> U[Load latest snapshot + market data]
  U --> R{Risk limits breached?}
  R -- Yes --> H1[Liquidate / cancel orders\nHalt entries] --> E([End])
  R -- No --> G{Market regime?}
  G -- Trend --> T1[Rank candidates\n(momentum/structure)]
  G -- Range --> T2[Scan oversold\n(reversion/RSI)]
  T1 --> F{Eligible + liquid?}
  T2 --> F
  F -- No --> E
  F -- Yes --> O[Build order\n(post-only limit)]
  O --> P[Place order]
  P --> Q{Filled within timeout?}
  Q -- No --> C1[Cancel/replace\nor skip] --> E
  Q -- Yes --> M1[Attach stop / trailing\nor bot-managed stop]
  M1 --> X{Exit condition hit?}
  X -- No --> E
  X -- Yes --> Z[Place exit order\nRecord PnL & costs] --> E
```

### Testing and deployment checklist

**Strategy correctness**
- Confirm your dashboard features are time-aligned (no look-ahead): the value used at decision time must be computable from data available then. citeturn8search4  
- Confirm stablecoin-like assets are excluded from momentum selection (unless you explicitly design for them).
- Confirm all filters (tier, volume, min notional) are enforced before sending orders. citeturn2search3turn6search3

**Backtesting methodology**
- Walk-forward evaluation, plus a final untouched holdout. citeturn8search2turn8search0  
- Use conservative fees/slippage. citeturn10search15turn13view0  
- Check parameter sensitivity: small parameter changes should not destroy performance; otherwise, it’s likely overfit. citeturn8search0

**Execution safety**
- Idempotent client order IDs; deduplicate retries.
- Rate-limit handling and exponential backoff; respect published limits. citeturn5search1turn5search2turn5search10  
- WebSocket disconnect recovery (resubscribe + resync).
- Cancel-all on startup and on failure states.

**Operational controls**
- “Kill switch” conditions: daily loss limit, max drawdown, consecutive order rejects, stale data detection.
- Secrets and API key hygiene: read-only keys for data; least privilege for trading.
- Alerting: fills, large slippage events, drawdown thresholds, and system errors.

### Scaling plan from $100 to larger capital

A realistic scaling approach is **stage-gated**:

1. **$100 “micro-live”**: target reliability and correct cost modelling, not maximum return.  
2. **$250–$500**: only after stable behaviour over *at least* 8–12 weeks, with live-minus-backtest deltas understood.  
3. **$1k–$5k**: introduce more diversification (3–5 positions), better execution (order book-aware), and possibly multi-venue routing only if a clear benefit exists.  
4. Consider derivatives/leverage only if you fully understand funding/liq dynamics and you are eligible in your jurisdiction; Australian product disclosures and enforcement history show that this varies and can be high-risk. citeturn4search1turn16view0

### Timeline with milestones for 6–12 months

**Month 1–2: Foundations and data integrity**
- Implement data ingestion: OHLCV + dashboard snapshots into a database.
- Implement symbol metadata fetch and validation: min notional, step size, product status. citeturn2search3turn7search1  
- Build a deterministic backtest harness with fees/slippage toggles.
- First “null strategy” benchmark (buy-and-hold; random entries) to sanity-check the test rig.

**Month 3–4: Strategy prototypes and walk-forward**
- Implement Strategy 1 and Strategy 2 rules exactly as specified; keep parameters small/interpretable.
- Run walk-forward studies with conservative costs; document stability across windows. citeturn8search2turn8search0  
- Build reporting: trade logs, cost attribution, drawdown analytics.

**Month 5–6: Paper trading and execution hardening**
- Paper trade with live data and full order lifecycle logic (timeouts, partial fills, cancels).
- Add monitoring and alerting; simulate disconnects and API errors; ensure recovery works. citeturn5search1turn5search10  
- Validate that predicted vs actual slippage is within tolerance; adjust slippage model. citeturn10search15turn1search1

**Month 7–9: Micro-live at $100**
- Trade small with strict kill-switches; compare live vs simulated.
- Tighten universe selection (higher volume tiers) if slippage is worse than expected.
- Freeze parameters; avoid constant tweaking (a major path to overfitting). citeturn8search0

**Month 10–12: Controlled scaling and improvement**
- If live stats remain acceptable: scale to $250–$500 with the same risk limits and turnover.
- Add optional enhancements:
  - order-book-aware entry pricing (small “price improvement” logic)
  - more robust regime detection (e.g., simple HMM as a research track, not required for first production version). citeturn9search12turn5search11  
- Establish an ongoing governance rhythm: monthly review, quarterly revalidation, and a formal “change control” log.

### Reference links

```text
Exchange fees & rules
- Binance trading fees: https://www.binance.com/en/fee/trading
- Binance symbol filters (min notional / lot size): https://developers.binance.com/docs/binance-spot-api-docs/filters
- Kraken fee schedule (AU): https://www.kraken.com/en-au/features/fee-schedule
- Kraken minimum order sizes: https://support.kraken.com/articles/360001389303-overview-of-cryptocurrency-minimums
- Coinbase Advanced fees (maker/taker explanation): https://help.coinbase.com/en/coinbase/trading-and-funding/advanced-trade/advanced-trade-fees
- Coinbase Advanced Trade API overview: https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/overview
- Coinbase Exchange products endpoint fields (min sizes): https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-all-known-trading-pairs
- OKX trading fee rules FAQ: https://www.okx.com/en-au/help/trading-fee-rules-faq

Data
- Binance Data Collection: https://data.binance.vision/
- Binance public-data repo: https://github.com/binance/binance-public-data

Backtesting rigor
- Probability of Backtest Overfitting (Bailey et al.): https://www.davidhbailey.com/dhbpapers/backtest-prob.pdf

Market microstructure / market making
- Avellaneda & Stoikov (limit order book market making paper): https://people.orie.cornell.edu/sfs33/LimitOrderBook.pdf
- Hummingbot PMM docs: https://hummingbot.org/strategies/v1-strategies/pure-market-making/
```

