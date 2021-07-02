var expect = require('chai').expect;

var sickles = '(//android.view.ViewGroup[@content-desc="itemView"])[2]/android.widget.TextView'
var knuts = '(//android.view.ViewGroup[@content-desc="itemView"])[3]/android.widget.TextView'
var dollars = '(//android.view.ViewGroup[@content-desc="itemView"])[4]/android.widget.TextView'
var euros = '(//android.view.ViewGroup[@content-desc="itemView"])[5]/android.widget.TextView'
var reais = '(//android.view.ViewGroup[@content-desc="itemView"])[6]/android.widget.TextView'

describe('Simple App testing', () => {

  // Adding time out to make sure the app is load prior to test is run
  beforeEach(() => {
    $("~pageTitle").waitForDisplayed(11000, false)
  });

  it('conversion works correctly', async => {
    $('~galleonsInput').setValue("1234");

    $(sickles).waitForDisplayed(3000);

    const sicklesText = $(sickles).getText();
    expect(sicklesText).to.equal('72.59 sickles');

    const knutsText = $(knuts).getText();
    expect(knutsText).to.equal('2.50 knuts');

    const dollarsText = $(dollars).getText();
    expect(dollarsText).to.equal('8193.76 USD');

    const eurosText = $(euros).getText();
    expect(eurosText).to.equal('6885.72 EUR');

    const reaisText = $(reais).getText();
    expect(reaisText).to.equal('26703.76 BRL');

  });

  it('modal works correctly', async => {

    $(sickles).click()

    $('~modalHeader').waitForDisplayed(3000)
    const modalHeader = $('~modalHeader').getText()
    const modalText = $('~modalText').getText()

    expect(modalHeader).to.equal('SIC')
    expect(modalText).to.equal('1 SIC = 17 GAL')
  })

  it.only('conversion doesnt work with NaN', async => {
    
    $('~galleonsInput').setValue("lalala");

    $(sickles).waitForDisplayed(3000);

    const sicklesText = $(sickles).getText();
    expect(sicklesText).to.equal('NaN sickles');

    const knutsText = $(knuts).getText();
    expect(knutsText).to.equal('NaN knuts');

    const dollarsText = $(dollars).getText();
    expect(dollarsText).to.equal('NaN USD');

    const eurosText = $(euros).getText();
    expect(eurosText).to.equal('NaN EUR');

    const reaisText = $(reais).getText();
    expect(reaisText).to.equal('NaN BRL');
  })


});