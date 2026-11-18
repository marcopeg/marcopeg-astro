---
name: draw-marco
description: Draw Marco Pegoraro as a consistent recognizable caricature in blog covers and illustrations, with everyday, nerd engineer, father, and adventurer variants. Use for Marco himself or the blog's unnamed male author stand-in; preserve other named people's identities.
---

# Draw Marco

Use Marco's supplied photos as the identity source. Change outfit, pose, emotion and setting to tell the article's story while keeping the same face across illustrations. This guide complements the blog's visual style; it does not replace the requested medium or authorize changing existing artwork.

## Identity anchors

**Always holding coffee:** every depiction of Marco must visibly hold a coffee cup in a hand. The cup must always have clearly visible delicate aroma/steam wisps curling upward from the coffee surface: 2–3 airy whorls, legible at normal viewing size. A cup on a desk alone does not satisfy this rule. Steam must read as hot coffee, not cigarette smoke or thick fog. Adapt the pose to leave one hand for coffee, including father and adventurer versions.

- Fair skin; broad oval face, gently squared jaw, broad forehead, natural expression lines.
- Short silver-gray hair, brushed upward and a little back into a compact textured quiff; shorter sides. The suit reference shows a shorter crop of the same hair. Default to the quiff.
- Blue-gray eyes; rounded panto/browline prescription glasses, dark upper rims, thinner translucent/metal lower rims and silver bridge. Keep the eyes visible. Clear glasses are the default in all four variants.
- Medium straight nose with a rounded tip; relatively thin upper lip, fuller lower lip.
- Neatly trimmed silver-gray mustache and chin goatee with light cheek stubble. Avoid a thick full beard.
- A knowing half-smile, observant eyes and gently expressive eyebrows are useful recurring cues. Adapt expression to the scene rather than fixing one smile.

Marco states he is 180 cm tall and weighs 92 kg. Draw a comfortably fuller, slightly chubby build: solid torso, soft rounded belly and waist, fuller upper arms, natural shoulders. Keep a realistically proportioned adult head; the first everyday study was rejected for an oversized head and overly slim body. Preserve his maturity and everyday proportions. Do not substitute a young dark-haired stock developer, exaggerated bald professor, huge-nosed clown or film actor's face. Clothing and poses are design choices; use the user-provided height and weight plus his requested fuller build rather than inventing an athletic physique.

## References and consistency

Read [references/variants.md](references/variants.md) for the selected persona. View local reference images before using them in generation.

Identity photographs, relative to this skill:
- `references/photos/front-glasses.png`: frontal face, eye color, glasses and facial-hair anchor.
- `references/photos/outdoor-glasses.png`: three-quarter face, hair shape and everyday expression. Strong sunlight changes apparent skin color; do not make the skin orange.
- `references/photos/smile-aviators.png`: broader smile and silver hair; sunglasses are optional styling, not default identity.
- `references/photos/short-hair-suit.png`: shorter hair variant, glasses and face shape. Suit is optional clothing.

The selected current character references are `references/characters/01-everyday-v4.png`, `02-engineer-v4.png`, `03-father-v4.png`, and `04-adventurer-v4.png`. The user asked to retain this set for future work, with a coffee cup held in EVERY depiction. These preserve the chosen corrected body/face design and add the always-held coffee requirement. Prefer these files over superseded studies. Use the photos to resolve likeness discrepancies.

Read [references/locked-prompts-steam.md](references/locked-prompts-steam.md) when reproducing a persona or revising the reference set. It links the exact frozen generation prompts and a manifest with ordered image inputs and checksums. Preserve these snapshots and current images verbatim; new revisions receive new filenames and prompts. Change the selected identity reference set only when the user requests or approves a revision.

Default rendering: warm editorial caricature, expressive ink contours and painterly shading, natural adult head-to-body proportions without head enlargement, real facial structure and tactile texture. Avoid plastic 3D or extreme comic distortion. For a cinematic or photographic cover, preserve the identity anchors while adapting the rendering to the requested style.

For multiple variants, establish one everyday design first; then pass that image plus the same identity photos into subsequent generations. Keep glasses shape, hair color, face proportions and facial hair consistent. Change the persona, not the person. If a face needs more room, simplify background detail rather than replacing it with a generic figure.

Reference photos establish Marco's identity only. Do not reproduce phone UI, photo locations, lanyards, clothing logos or other people unless relevant and requested. The father variant does not require a real child's facial likeness.

## Prompt and review

Build prompts in this order: identify the supplied photos as the identity references; name the established character image as the style/proportion reference; specify the chosen persona; add the article's scene and rendering; state what must stay unchanged.

Before delivering, compare the output to the photos: silver quiff, glasses, eye color, broad face and gray goatee should read as the same person at normal viewing size. Check that the head is not oversized, the torso is comfortably full, and engineer scenes use the laptop’s built-in keyboard with no external keyboard. Check that a coffee cup is visibly held in a hand with steam whirling upward, then check hands, hat clearance and baby-carrier posture where relevant. Correct concrete drift without regenerating unrelated parts. Save candidates and prompts under `materials/characters/marco/` or the current article's cover folder. Apply artwork to an article when requested.
