<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Product/category data lives only in src/data (products.ts, images.ts) typed by src/types/product.ts — keeps a future backend/admin swap to one place.
- Cart is client-only (React context + localStorage in src/lib/cart.tsx); checkout is a WhatsApp deep link built in src/lib/whatsapp.ts — no payments/backend in v1.
