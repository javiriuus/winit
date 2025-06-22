import { useState } from "react";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section id="contact" className="text-center py-16 px-6">
        <h2 className="text-3xl font-bold">Ready to Bring Your Vision to Life?</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-6 px-6 py-2 bg-white text-black rounded-full"
        >
          Get in Touch
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-black text-xl"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-black text-center">Contact me!</h2>
              <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: form.name.value,
                      email: form.email.value,
                      message: form.message.value,
                    }),
                  });

                  if (res.ok) {
                    alert("Message sent!");
                    form.reset();
                  } else {
                    alert("Something went wrong. Try again.");
                  }
                }}
                className="space-y-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                  rows={4}
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition w-full"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
