const posts = require('../data/posts.json');

(async () => {
  const failures = [];

  for (const post of posts) {
    const url = `http://localhost:3000/${post.slug}`;

    try {
      const res = await fetch(url, { redirect: 'manual' });
      const status = res.status;

      if (status >= 400 || status >= 300 && status < 400) {
        failures.push({ slug: post.slug, status, url });
      }
    } catch (error) {
      failures.push({ slug: post.slug, status: 'fetch-error', url, message: error.message });
    }
  }

  console.log(JSON.stringify({ checked: posts.length, failures }, null, 2));
})();
