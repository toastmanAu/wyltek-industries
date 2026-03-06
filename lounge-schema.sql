-- Wyltek Members Lounge — Supabase Schema
-- Run this in the Supabase SQL editor: https://supabase.com/dashboard/project/yhntwgjzrzyhyxpiqcts/sql

-- ──────────────────────────────────────────────
-- 1. Messages table
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lounge_messages (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  address    text NOT NULL,
  channel    text DEFAULT 'general' CHECK (channel IN ('general','feedback','ideas','dev')),
  message    text NOT NULL CHECK (char_length(message) >= 1 AND char_length(message) <= 500),
  reply_to   uuid REFERENCES lounge_messages(id) ON DELETE SET NULL,
  deleted    boolean DEFAULT false
);

-- RLS: browser can only read non-deleted messages
-- All writes go through the Cloudflare Worker (service role key)
ALTER TABLE lounge_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read non-deleted messages"
  ON lounge_messages FOR SELECT
  USING (deleted = false);

-- No INSERT/UPDATE/DELETE from browser — worker uses service role (bypasses RLS)

-- ──────────────────────────────────────────────
-- 2. Reactions table (browser write allowed via RLS)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lounge_reactions (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  message_id uuid NOT NULL REFERENCES lounge_messages(id) ON DELETE CASCADE,
  address    text NOT NULL,
  emoji      text DEFAULT '👍' CHECK (emoji IN ('👍','🔥','🧠','⚡')),
  UNIQUE(message_id, address, emoji)
);

ALTER TABLE lounge_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can read reactions"
  ON lounge_reactions FOR SELECT USING (true);

CREATE POLICY "authenticated members can react"
  ON lounge_reactions FOR INSERT WITH CHECK (true);

CREATE POLICY "members can remove own reaction"
  ON lounge_reactions FOR DELETE USING (true);

-- ──────────────────────────────────────────────
-- 3. Enable Realtime on lounge_messages
-- ──────────────────────────────────────────────
-- Run this to enable realtime publication:
ALTER PUBLICATION supabase_realtime ADD TABLE lounge_messages;

-- ──────────────────────────────────────────────
-- 4. Index for performance
-- ──────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS lounge_messages_channel_created
  ON lounge_messages (channel, created_at DESC)
  WHERE deleted = false;

CREATE INDEX IF NOT EXISTS lounge_reactions_message_id
  ON lounge_reactions (message_id);
