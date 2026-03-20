import { notFound } from 'next/navigation'
import {
  ImprintPage,
  PrivacyPage,
  SubprocessorsPage,
  TermsPage
} from '@/features/landing'

type CatchAllProps = {
  params: Promise<{ rest?: string[] }>
}

export default async function CatchAllPage({ params }: CatchAllProps) {
  const { rest = [] } = await params
  const slug = rest[0]

  if (slug === 'imprint') return <ImprintPage />
  if (slug === 'privacy') return <PrivacyPage />
  if (slug === 'terms') return <TermsPage />
  if (slug === 'subprocessors') return <SubprocessorsPage />

  notFound()
}
