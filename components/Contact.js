export default function Contact() {
  return (
    <section className="text-center py-16 px-6">
      <h2 className="text-3xl font-bold">Ready to Bring Your Vision to Life?</h2>
      <button
        onClick={() => {
          window.location.href = "mailto:javierllarena@gmail.com";
        }}
        className="mt-6 px-6 py-2 bg-black text-white rounded-full"
      >
        Get in Touch
      </button>
    </section>
  );
}
