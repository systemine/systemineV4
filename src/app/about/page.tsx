import type { Metadata } from "next";
import Container from "@/components/Container";
import Sprig from "@/components/Sprig";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Systemine exists — and the years of sitting with overwhelmed people that shaped it.",
};

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
          About
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
          I kept wishing someone had already made these things.
          <br />
          So I started making them.
        </h1>

        <div className="prose-paper mt-12">
          <p>
            For a long time I thought I just needed to get more organized.
            I bought the planners. I tried the apps. I watched the videos
            about morning routines made by people who, as far as I could
            tell, had never once been too tired to open their laptop.
          </p>

          <p>
            None of it was built for the version of life I actually had —
            the one with a move I hadn&rsquo;t unpacked from, a diagnosis I
            was still getting used to saying out loud, a creative project
            I&rsquo;d abandoned four times, and a to-do list that had somehow
            become a source of shame instead of help. Most of what existed
            assumed I had the energy to build a system before I could use
            it. I didn&rsquo;t. I think most people don&rsquo;t.
          </p>

          <h2>Where this actually comes from</h2>

          <p>
            Before Systemine, I spent years working as a behavioural
            therapist and in mental health support — sitting across from
            people on some of their hardest days, watching what genuinely
            helped someone get through a week and what was just noise
            dressed up as advice. You learn certain things doing that
            work that you don&rsquo;t learn anywhere else: that willpower is
            a terrible foundation to build a life on, that shame makes
            people worse at the exact things they&rsquo;re ashamed of, and
            that the right structure — offered at the right moment, without
            judgment — can do more for someone than a hundred motivational
            quotes ever will.
          </p>

          <p>
            That&rsquo;s the thinking underneath everything here. Every
            template, tracker and checklist on this site is built the way
            I&rsquo;d build a tool for someone I was actually sitting with —
            not to fix them, not to optimize them, just to make the next
            hour a little easier to get through.
          </p>

          <h2>What changed</h2>

          <p>
            I started making small, working things for myself, using
            everything I&rsquo;d learned about how people actually change
            behaviour. A spreadsheet to get through a breakup without
            losing the plot. A one-page tracker for a health thing that
            felt impossible to explain to yet another new doctor. A
            checklist for the specific chaos of packing up an apartment
            in eleven days. Nothing elegant. Just useful.
          </p>

          <p>
            Eventually I showed one of these to a friend going through
            her own version of the same thing, and she asked if I could
            send it to her. Then another friend. Then someone I&rsquo;d
            never met, from a friend of a friend, who said it helped more
            than anything else she&rsquo;d tried. That&rsquo;s the whole
            origin story, really — nothing more dramatic than that.
          </p>

          <p>
            Systemine is what happened when I started taking that
            seriously: cleaning the tools up, making them look like
            something you&rsquo;d actually want to open on a hard day, and
            building a small, quiet place to keep them.
          </p>

          <h2>What this is, and isn&rsquo;t</h2>

          <p>
            This isn&rsquo;t a productivity brand. I don&rsquo;t think you&rsquo;re
            lazy, and I don&rsquo;t think the answer to being overwhelmed is
            a better morning routine. I think most of us are doing a lot
            with very little support, and a well-made tool can carry some
            of that weight so you don&rsquo;t have to hold all of it in your
            head.
          </p>

          <p>
            Everything here is made with care, informed by real work with
            real people, and tested on an actual human before it goes
            anywhere near this site — usually me, sometimes someone I
            trust.
          </p>

          <h2>If you&rsquo;re here</h2>

          <p>
            You probably found this site while looking for something
            specific, at a time that wasn&rsquo;t especially easy. I hope
            what&rsquo;s here helps, even a little. And if it isn&rsquo;t here
            yet, it might be soon — I&rsquo;m still building.
          </p>
        </div>

        <div className="my-16 flex justify-center text-line">
          <Sprig className="h-6 w-32" />
        </div>

        <div className="rounded-xl2 border border-line/70 bg-paper-alt px-8 py-10 text-center">
          <h2 className="font-display text-xl text-ink">
            Want to know when something new is ready?
          </h2>
          <p className="mt-2 font-body text-sm text-ink-soft">
            No noise. Just the occasional note when there&rsquo;s something
            worth your time.
          </p>
          <div className="mt-6 flex justify-center">
            <NewsletterForm compact />
          </div>
        </div>
      </div>
    </Container>
  );
}
