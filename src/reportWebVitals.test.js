// reportWebVitals.test.js
jest.mock('web-vitals', () => ({
    getCLS: jest.fn(cb => cb({ name: 'CLS', value: 0.123 })),
    getFID: jest.fn(cb => cb({ name: 'FID', value: 45 })),
    getFCP: jest.fn(cb => cb({ name: 'FCP', value: 1.2 })),
    getLCP: jest.fn(cb => cb({ name: 'LCP', value: 2.3 })),
    getTTFB: jest.fn(cb => cb({ name: 'TTFB', value: 0.456 })),
  }));
  
  import reportWebVitals from './reportWebVitals';
  import * as vitals from 'web-vitals';
  
  test('reportWebVitals calls each web-vitals metric', async () => {
    const callback = jest.fn();
    await reportWebVitals(callback);
    expect(vitals.getCLS).toHaveBeenCalledWith(callback);
    expect(vitals.getFID).toHaveBeenCalledWith(callback);
    expect(vitals.getFCP).toHaveBeenCalledWith(callback);
    expect(vitals.getLCP).toHaveBeenCalledWith(callback);
    expect(vitals.getTTFB).toHaveBeenCalledWith(callback);
  });
  