import { ButtonLink, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-28 sm:px-8 sm:py-36">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-lg text-muted">The link may be out of date.</p>
      <div className="mt-8">
        <ButtonLink href="/" variant="primary">
          Back to the home page
        </ButtonLink>
      </div>
    </div>
  );
}
