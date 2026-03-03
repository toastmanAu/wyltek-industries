-- Run this in Supabase SQL editor:
-- https://supabase.com/dashboard/project/yhntwgjzrzyhyxpiqcts/sql/new

-- Member number sequence
CREATE SEQUENCE IF NOT EXISTS member_number_seq START 1;

-- Mint queue table
CREATE TABLE IF NOT EXISTS public.mint_queue (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ckb_address     text UNIQUE NOT NULL,
  member_number   integer DEFAULT nextval('member_number_seq'),
  status          text DEFAULT 'pending',   -- pending | minting | minted | failed
  tx_hash         text,
  error           text,
  created_at      timestamptz DEFAULT now(),
  minted_at       timestamptz
);

-- RLS: anyone can insert their own address; only service role can update
ALTER TABLE public.mint_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join queue" ON public.mint_queue
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read their own entry" ON public.mint_queue
  FOR SELECT USING (true);  -- public leaderboard is fine

-- Only service role can update status/tx_hash
-- (enforced by using service role key on Pi side only)
