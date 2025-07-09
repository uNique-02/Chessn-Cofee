import React from "react";
import {
  Mail,
  MessageSquare,
  Github,
  X,
  Linkedin,
  Instagram,
  Dribbble,
} from "lucide-react";
import useSubscriberStore from "../stores/useSubscriberStore.js";
import useContactStore from "../stores/useContactStore.js";

export default function ContactSection() {
  const { addSubscriber } = useSubscriberStore();
  const { sendMessage } = useContactStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    await sendMessage(name, email, subject, message);
    form.reset(); // Optional: clear form after sending
  };

  return (
    <section className="bg-white text-gray-800 py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-2">
          Get in Touch
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Have a project in mind or just want to chat? Send me a message!
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <div className="bg-white text-gray-800 border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded cursor-pointer"
              >
                Send Message ✈️
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Find Me Here</h3>
              <div className="flex items-center text-gray-700 mb-2">
                <Mail className="w-5 h-5 mr-2 text-pink-500" />
                <span>kcnique@up.edu.ph</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MessageSquare className="w-5 h-5 mr-2 text-pink-500" />
                <span>Available for freelance projects & collaborations.</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Connect With Me</h3>
              <div className="flex gap-3">
                {[
                  {
                    icon: <Github />,
                    label: "GitHub",
                    href: "https://github.com/uNique-02",
                  },
                  {
                    icon: <X />,
                    label: "X",
                    href: "https://x.com/niqueK_02",
                  },
                  {
                    icon: <Linkedin />,
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/kim-nique/",
                  },
                  {
                    icon: <Instagram />,
                    label: "Instagram",
                    href: "https://www.instagram.com/odisacmik/",
                  },
                  // {
                  //   icon: <Dribbble />,
                  //   label: "Dribbble",
                  //   href: "https://dribbble.com/yourusername",
                  // },
                ].map(({ icon, label, href }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-pink-400 text-pink-500 hover:bg-pink-100"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
