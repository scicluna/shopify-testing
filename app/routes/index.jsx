import { useLoaderData, Link } from "@remix-run/react";
import { Image } from '@shopify/hydrogen';

export const meta = () => {
    return {
        title: 'Hydrogen',
        description: 'A custom storefront powered by Hydrogen',
    };
};

export async function loader({ context }) {
    return await context.storefront.query(COLLECTIONS_QUERY)
}

export default function Index() {
    const { collections } = useLoaderData();

    return (
        <section className="w-full gap-4">
            <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
                Collections
            </h2>
            <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false w-1/2 h-auto">
                {collections.nodes.map((collection) => {
                    return (
                        <Link to={`/collections/${collection.handle}`} key={collection.id}>
                            <div className="grid gap-4">
                                {collection?.image && (
                                    <Image
                                        alt={`Image of ${collection.title}`}
                                        data={collection.image}
                                        key={collection.id}
                                        sizes="(max-width: 32em) 80vw, 25vw"
                                        widths={[200, 300, 400, 500]}
                                        loaderOptions={{
                                            scale: 2,
                                            crop: 'center',
                                        }}
                                    />
                                )}
                                <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                                    {collection.title}
                                </h2>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>)
}

const COLLECTIONS_QUERY = `#graphql
{
    collections(first: 4) {
          nodes {
            id
            title
            handle
            image {
                altText
                width
                height
                url
            }
          }
        }
    }
`;

