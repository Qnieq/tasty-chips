import { useRouter } from "next/router";

export default function Page({ slug }: { slug: string }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!slug) {
    return <div>404 - Page Not Found</div>;
  }

  return <div>Page: {slug}</div>;
}

export async function getStaticPaths() {
  return {
    paths: [], // Predefine paths here
    fallback: true, // Enable fallback for non-existent pages
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug: params.slug,
    },
  };
}