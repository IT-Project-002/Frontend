import {validName, validEmail, validPwd, validMatch} from "./register";

describe("Register username format",()=>{
    test("validName function should pass on correct input",()=> {
        const text = "Text123_";
        expect(validName(text)).toBe(true);
    })

    test("validName function should fail when more than 14 characters",()=> {
        const text = "texttexttexttext";
        expect(validName(text)).toBe(false);
    })

    test("validName function should fail when less than 3 characters",()=> {
        const text = "te";
        expect(validName(text)).toBe(false);
    })
});

describe("Register email format",()=>{
    test("validEmailfunction should pass on correct input",()=> {
        const text = "text@gmail.com";
        expect(validEmail(text)).toBe(true);
    })

    test("validEmailfunction should pass on correct input 2",()=> {
        const text = "text@gmail.com.au";
        expect(validEmail(text)).toBe(true);
    })

    test("validEmail function should fail when missing @",()=> {
        const text = "textgmailcom";
        expect(validEmail(text)).toBe(false);
    })

    test("validEmail function should fail when missing .",()=> {
        const text = "text@gmailcom";
        expect(validEmail(text)).toBe(false);
    })

    test("validEmail function should fail when missing letters before @",()=> {
        const text = "@gmail.com";
        expect(validEmail(text)).toBe(false);
    })

    test("validEmail function should fail when missing letters before .",()=> {
        const text = "text@.com";
        expect(validEmail(text)).toBe(false);
    })

    test("validEmail function should fail when missing letters after .",()=> {
        const text = "text@gmail.";
        expect(validEmail(text)).toBe(false);
    })
});

describe("Register password format",()=>{
    test("validPwd function should pass on correct input",()=> {
        const text = "Text1234";
        expect(validPwd(text)).toBe(true);
    })

    test("validPwd function should fail when more than 24 characters",()=> {
        const text = "Texttexttexttexttexttexttext1";
        expect(validPwd(text)).toBe(false);
    })

    test("validPwd function should fail when less than 8 characters",()=> {
        const text = "Te1";
        expect(validPwd(text)).toBe(false);
    })
});

describe("Register password confirmation",()=>{
    test("validMatch function should pass on correct input",()=> {
        const text1 = "Text1234";
        const text2 = "Text1234";
        expect(validMatch(text1,text2)).toBe(true);
    })

    test("validMatch function should fail with incorrect input 1",()=> {
        const text1 = "Text1234";
        const text2 = "text1234";
        expect(validMatch(text1,text2)).toBe(false);
    })

    test("validMatch function should fail with incorrect input 2",()=> {
        const text1 = "Text1234";
        const text2 = "text1243";
        expect(validMatch(text1,text2)).toBe(false);
    })
});
