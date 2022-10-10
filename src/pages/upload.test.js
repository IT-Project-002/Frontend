import { validName,validPrice,validDesc,validTag } from "./upload";

describe("Upload/Edit item name format", () => {
    test("validName function should pass on correct input", () => {
      const text = "text text";
      expect(validName(text)).toBe(true);
    });
  
    test("validName function should fail when less than 3 characters", () => {
      const text = "te";
      expect(validName(text)).toBe(false);
    });

    test("validName function should fail when more than 40 characters", () => {
        const text = "Handmade little Accent Wreath Yellow Yello";
        expect(validName(text)).toBe(false);
      });

    test("validName function should fail when contains special characters", () => {
    const text = "text@";
    expect(validName(text)).toBe(false);
    });
});

describe("Upload/Edit item price format", () => {
    test("validPrice function should pass on correct input", () => {
      const text = "10.25";
      expect(validPrice(text)).toBe(true);
    });

    test("validPrice function should pass on correct input 2", () => {
        const text = "10";
        expect(validPrice(text)).toBe(true);
    });
  
    test("validPrice function should fail when less than 1", () => {
      const text = "0.00";
      expect(validPrice(text)).toBe(false);
    });

    test("validPrice function should fail when greater than 999999999", () => {
        const text = "100000000.00";
        expect(validPrice(text)).toBe(false);
      });
    
    test("validPrice function should fail when more than 2 decimals", () => {
        const text = "11.000";
        expect(validPrice(text)).toBe(false);
    });
});

describe("Upload/Edit item description format", () => {
    test("validDesc function should pass on correct input 1", () => {
      const text = "This is my item.";
      expect(validDesc(text)).toBe(true);
    });

    test("validDesc function should pass on correct input 2", () => {
        const text = "This is my item!";
        expect(validDesc(text)).toBe(true);
      });
  
    test("validDesc function should fail when less than 10 characters", () => {
      const text = "text";
      expect(validDesc(text)).toBe(false);
    });

    test("validDesc function should fail when greater than 480 characters", () => {
        const text = "18K GOLD PLATED TROPICAL LEAF DANGLE EARRINGS Beefancy elegant look in a fashionable engraved Roman art design. To ensure the life of your jewellery avoid contact with water, lotions or perfume. A charming gift for you or a loved one, these eye-catching earrings are crafted to compliment any outfit and provide a luxurious and stylish touch no matter the occasion. Material: 18K Gold Plated Width: 3.5 cm Drop Length: 4.5 cm Height: 7cm Weight: 12.8 gr You can always find variety products in Beefancy world."
        expect(validDesc(text)).toBe(false);
      });
});

describe("Upload/Edit item tags", () => {
    test("validTag function should pass on correct input", () => {
      const text = [{value:"class",label:"Glass"}];
      expect(validTag(text)).toBe(true);
    });
});