import ContactForm from "@/components/ContactForm";
import HeroImage from "@/components/HeroImage";
// className="right-0 -scale-x-100 lg:-right-28"
function page() {
  return (
    <div className="h-full py-6">
      <HeroImage className="-scale-x-100 object-left-bottom" />
      <div className="container relative z-10 flex h-full flex-col justify-center font-poppins">
        <div className="space-y-2">
          <p className="font-semibold uppercase text-alt underline">contact</p>
          <h2 className="text-3xl font-semibold capitalize">get in touch!</h2>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

export default page;
