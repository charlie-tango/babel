it('should run babel and compile the code', () => {
  const expected = {... {env: process.env.NODE_ENV}};
  expect(expected).toEqual({env: process.env.NODE_ENV});
});