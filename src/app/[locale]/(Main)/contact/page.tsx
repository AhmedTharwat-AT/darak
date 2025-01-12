import ContactForm from "@/components/ContactForm";
import HeroImage from "@/components/HeroImage";
import { getDictionary } from "../../dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

async function page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const dictionary = await getDictionary(locale);

  return (
    <section className="h-full py-8">
      <div className="absolute inset-0 w-full -scale-x-100">
        <HeroImage className="object-left-bottom max-sm:object-cover" />
      </div>

      <div className="container relative z-10 flex h-full flex-col justify-center font-poppins">
        <div className="space-y-2">
          <p className="font-semibold uppercase text-alt underline">contact</p>
          <h2 className="text-3xl font-semibold capitalize">
            {dictionary.contact.title}
          </h2>
        </div>
        <ContactForm dictionary={dictionary} />
      </div>
    </section>
  );
}

export default page;
