export const dataFactory = {
  uniqueId(): string {
    return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  },

  name(prefix = 'Test'): string {
    return `${prefix}${this.uniqueId().slice(-6)}`;
  },

  number(min = 1, max = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  post(userId = 1): { userId: number; title: string; body: string } {
    return {
      userId,
      title: this.name('Title'),
      body: `Body ${this.uniqueId()}`,
    };
  },

  customer(): { firstName: string; lastName: string; postalCode: string } {
    return {
      firstName: this.name('First'),
      lastName: this.name('Last'),
      postalCode: String(this.number(10000, 99999)),
    };
  },
};
