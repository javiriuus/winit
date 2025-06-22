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
              <h2 className="text-2xl font-bold mb-4 text-center">Send me an email</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <textarea
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
