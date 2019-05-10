const iss = {
  latitude: 50,
  longitude: 50,
  altitude: 50,
};

function mockFetch(data) {
  return jest.fn().mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => data,
  }));
}

module.exports = {
  iss,
  mockFetch,
};
