it('should run babel and compile the code', () => {
  const expected = {... {env: process.env.NODE_ENV}};
  expect(expected).toEqual({env: process.env.NODE_ENV});
});

async function asyncMethod() {
  const result = await fetch('/data', {})
  const json = result.json()
  const data = json?.data ?? {}
  console.log(data)
}