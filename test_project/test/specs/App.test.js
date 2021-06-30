var expect = require('chai').expect;

var sickles = '(//android.view.ViewGroup[@content-desc="itemView"])[2]/android.widget.TextView'

describe('Simple App testing', () => {

  // Adding time out to make sure the app is load prior to test is run
  beforeEach(() => {
    $("~pageTitle").waitForDisplayed(11000, false)
  });

  it('Valid Conversion Test', async => {
    $('~galleonsInput').setValue("1234");

    $(sickles).waitForDisplayed(11000);
    const sicklesQtd = $(sickles).getText();
    console.log(sicklesQtd)
   // expect(sicklesQtd).to.equal('72.59 sickles');
  });


});