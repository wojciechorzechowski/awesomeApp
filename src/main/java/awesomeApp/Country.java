package awesomeApp;

import org.springframework.beans.factory.annotation.Autowired;


public class Country {
	public Country(){
		System.out.println("==== in Country ===="+id);
	}
	
	@Autowired
	private int id;
	
	@Autowired
	private String countryName;
	
	@Autowired
	private String countryCurrency;
	
	@Autowired
	private int tax;
	
	@Autowired
	private int fixedCost;
	
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		System.out.println("==== in Country - settingId ===="+id);
		this.id = id;
	}
	public String getCountryName() {
		return countryName;
	}
	public void setCountryName(String countryName) {
		System.out.println("==== in Country - setting name ===="+countryName);
		this.countryName = countryName;
	}
	public String getCountryCurrency() {
		return countryCurrency;
	}
	public void setCountryCurrency(String countryCurrency) {
		this.countryCurrency = countryCurrency;
	}
	public int getTax() {
		return tax;
	}
	public void setTax(int tax) {
		this.tax = tax;
	}
	public int getFixedCost() {
		return fixedCost;
	}
	public void setFixedCost(int fixedCost) {
		this.fixedCost = fixedCost;
	}
}
