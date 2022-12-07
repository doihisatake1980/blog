import Image from 'next/image'
import { createGetClient, Blog, Post } from "../../models/blog"

export default function Blogs (post: Post) {
  return (
    <main>
      {post.eyecatch && <Image src={post.eyecatch.url} alt="eyecatch" width={post.eyecatch.width} height={post.eyecatch.height} />}
      <article id={post.id}>
        <h1 className="text-4xl font-bold underline">{post.title}</h1>
        <div dangerouslySetInnerHTML={{
              __html: post.content,
            }}
        >
        </div>
        <dl>
          <dd>createdAt</dd>
          <dt>{post.createdAt}</dt>
          <dd>updatedAt</dd>
          <dt>{post.updatedAt}</dt>
          <dd>publishedAt</dd>
          <dt>{post.publishedAt}</dt>
          <dd>revisedAt</dd>
          <dt>{post.revisedAt}</dt>
        </dl>
      </article>
    </main>
  )
}

export async function getStaticPaths() {
  const service_domain = process.env.SERVICE_DOMAIN
  const api_key = process.env.API_KEY

  const client = createGetClient(service_domain, api_key)
  if (client) {
    const blog: Blog = await client
      ({
        endpoint: "blogs",
        queries: { limit: 20 },
      })
    return {
      paths: blog.contents.map((content) => ({params: {content_id: content.id}})),
      fallback: false
    }
  }
}

export async function getStaticProps(context: any) {
  const service_domain = process.env.SERVICE_DOMAIN
  const api_key = process.env.API_KEY

  const client = createGetClient(service_domain, api_key)
  if (client) {
    const blog: Blog = await client({
        endpoint: "blogs",
        queries: {limit: 20, ids: context.params.content_id},
      })
    return {
      props: blog.contents[0]
    }
  } else {
    return {
      props: {}
    }
  }
}