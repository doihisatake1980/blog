export {createGetClient}

import {createClient} from "microcms-js-sdk";

type Time = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

export type Post = Time & {
  id: string
  title: string
  content: string
  eyecatch: Eyecatch
  category: Category
}

export type Blog = {
  contents: Post[]
  totalCount: number
  offset?: number
  limit?: number
}

type Eyecatch = {
  url: string
  height: number
  width: number
}

type Category = Time & {
  id: string
  name: string
}

function createGetClient(service_domain: string | undefined, api_key: string | undefined) {
	if (typeof(service_domain) === "string" && typeof(api_key) === "string") {
		return createClient({
			serviceDomain: service_domain,
			apiKey: api_key,
		}).get
	}
}