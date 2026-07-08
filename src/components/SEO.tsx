import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../data/site'

/*
 * Lightweight, dependency-free per-page SEO. Instead of pulling in a helmet
 * library, we imperatively sync a small set of <head> tags on mount / route
 * change. Tags we create are marked with data-seo="1" so we only ever touch
 * our own managed tags and never fight the static tags in index.html that we
 * intentionally leave as sensible defaults.
 */

interface SEOProps {
  title: string
  description: string
  /** Path-relative canonical (e.g. "/services"). Defaults to the current path. */
  path?: string
  /** Optional absolute OG image URL. Falls back to the site default if set. */
  image?: string
}

/** Create or update a managed <meta>/<link> tag in <head>. */
function upsert(
  selector: string,
  create: () => HTMLElement,
  apply: (el: HTMLElement) => void,
): void {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    el.setAttribute('data-seo', '1')
    document.head.appendChild(el)
  }
  apply(el)
}

function setMetaName(name: string, content: string): void {
  upsert(
    `meta[name="${name}"]`,
    () => {
      const m = document.createElement('meta')
      m.setAttribute('name', name)
      return m
    },
    (el) => el.setAttribute('content', content),
  )
}

function setMetaProperty(property: string, content: string): void {
  upsert(
    `meta[property="${property}"]`,
    () => {
      const m = document.createElement('meta')
      m.setAttribute('property', property)
      return m
    },
    (el) => el.setAttribute('content', content),
  )
}

function setCanonical(href: string): void {
  upsert(
    'link[rel="canonical"]',
    () => {
      const l = document.createElement('link')
      l.setAttribute('rel', 'canonical')
      return l
    },
    (el) => el.setAttribute('href', href),
  )
}

export function SEO({ title, description, path, image }: SEOProps) {
  const location = useLocation()
  const resolvedPath = path ?? location.pathname
  const url = `${SITE_URL}${resolvedPath === '/' ? '' : resolvedPath}`

  useEffect(() => {
    document.title = title
    setMetaName('description', description)
    setCanonical(url)

    // Open Graph
    setMetaProperty('og:title', title)
    setMetaProperty('og:description', description)
    setMetaProperty('og:url', url)
    setMetaProperty('og:type', 'website')
    setMetaProperty('og:site_name', 'Laine Industries')
    if (image) setMetaProperty('og:image', image)

    // Twitter
    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:title', title)
    setMetaName('twitter:description', description)
    if (image) setMetaName('twitter:image', image)
  }, [title, description, url, image])

  return null
}
