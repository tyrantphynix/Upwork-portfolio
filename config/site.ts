export const siteConfig = {
  name: 'Chirag',
  title: 'Chirag Rawat — Full-Stack Developer',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'chirag.rawat1000@gmail.com',
  get mailto() {
    return `mailto:${this.email}`;
  },
  socials: {
    github: {
      label: 'GitHub',
      url: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/tyrantphynix',
      get displayValue() {
        return this.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      },
    },
    linkedin: {
      label: 'LinkedIn',
      url: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/chirag-rawat-061a3a1b1',
      get displayValue() {
        return this.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      },
    },
    twitter: {
      label: 'Twitter / X',
      url: process.env.NEXT_PUBLIC_TWITTER_URL || '',
      get displayValue() {
        if (!this.url) return 'Twitter / X';
        const cleaned = this.url.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\/?/, '');
        if (cleaned) {
          return `@${cleaned.replace(/\/$/, '')}`;
        }
        return 'Twitter / X';
      },
    },
  },
};
