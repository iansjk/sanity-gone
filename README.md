# Sanity;Gone

**Sanity;Gone** is a community resource for Arknights players, providing quick guides, reviews, and detailed information about the game.

## Building the app

The site is built using Next.js. It uses two datasources: the internal game JSON (which we use for operator/summon stats, skills, talents, etc.) as well as a Contentful CMS integration (for operator guides).

To run the app locally:

1. Copy `.env.example` to `.env`
2. Fill in the CONTENTFUL_ACCESS_TOKEN value (ask a team member for this)
3. `yarn install`
4. `yarn start`
5. Point your browser at `localhost:3000`

## Testing components in isolation

To test React components in isolation, use Storybook:

1. `yarn storybook`
2. Visit `localhost:6006`

## Acknowledgements

- **Kengxxiao** for their Arknights game data repository
- **Jetroyz** for translations of not-yet-released operator skills and talents
- **Aceship** for Arknights assets and community support

## Disclaimer

Sanity;Gone Zero is an unofficial fan project and is not affiliated with or endorsed by Hypergryph/Studio Montagne/Yostar, Arknights’ creators & distributors. The in-game assets used on this site are the property of Hypergryph/Yostar.

## License

GPLv2 or later
