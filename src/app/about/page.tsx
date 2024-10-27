'use client';

import React from 'react';

export default function About() {
  return (
    <main className="pt-8">
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Info</h1>
        <p className="mb-4">
          Zbieramy kasę i rozliczamy się co weekend. Koszt sauny to X zł za
          jedną. W zależności ile osób się uda uzbierać taka będzie ostateczna
          cena.
        </p>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Lokalizacja</h2>
          <p className="mb-4">(Obok BeachBar41)</p>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d397.93187447118413!2d18.6385349703264!3d54.408933724549115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1729944092208!5m2!1spl!2spl"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
}
