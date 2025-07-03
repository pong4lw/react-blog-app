import React from 'react';
import Head from 'next/head';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">My Blog</h1>
      </header>
      <main className="flex flex-col md:flex-row max-w-4xl mx-auto mt-8">
        <div className="md:w-3/4">{children}</div>
        <aside className="md:w-1/4 md:pl-8 mt-4 md:mt-0">
          <p className="text-gray-600">サイドバー（プロフィールなど）</p>
        </aside>
      </main>
      <footer className="text-center text-sm text-gray-500 mt-10 mb-4">
        © 2025 My Blog
      </footer>
    </>
  );
};

export default Layout;
