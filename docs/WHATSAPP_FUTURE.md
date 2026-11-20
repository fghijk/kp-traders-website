# Future official WhatsApp automation (NOT included in the zero-cost release)

The free WhatsApp Business mobile app provides greeting/away messages, quick replies, and catalogue, **not** a programmable Supabase-driven interactive chatbot. The live website uses official `wa.me` links; customers press Send themselves.

## Possible future official integration

1. Verify the new number's eligibility for WhatsApp Business Platform and Business App coexistence with Meta or an authorized provider. Do not assume a new number qualifies.
2. Set up Meta Business verification as required, webhook subscriptions, and secure token storage in a server-side environment.
3. Verify webhook signatures, reject duplicate message IDs, and handle retries/idempotency.
4. Conversation state machine: `LANGUAGE -> PRODUCT -> QUANTITY -> PRICE -> OWNER_HANDOFF` with `BACK`, `MENU`, and `TALK_TO_OWNER` transitions.
5. Read current `products`, `product_variants`, `product_images`, and `promotions` from Supabase for each interaction. Never trust customer-submitted prices.
6. Send product images using supported WhatsApp media messages; use interactive lists/buttons within platform limits.
7. Human handoff: pause bot, flag the thread for owner, and use an officially supported Business App coexistence/inbox integration. Validate actual behavior before launch.
8. Support Hindi and English. Save language preference and conversation state with minimal necessary data and a retention policy.
9. Respect WhatsApp messaging windows, opt-in rules, templates, fees and local privacy requirements. Do not send unsolicited promotions.

## Suggested future tables

- `wa_contacts(id, wa_id unique, language, created_at)`
- `wa_conversations(id, contact_id, state, selected_product_id, selected_variant_id, handoff_at, updated_at)`
- `wa_webhook_events(message_id unique, received_at)`

Use separate migrations and RLS for these tables when integration is approved. No unofficial WhatsApp Web automation or scraping.
