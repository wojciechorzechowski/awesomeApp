package awesomeApp;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Class that represents country
 * 
 * @author orzech
 *
 */
public class Country {

	private Log log = LogFactory.getLog(Countries.class);

	public Country() {
		if (log.isInfoEnabled()) {
			log.info("In Country constructor");
		}
	}

	/**
	 * id of Country
	 */
	@Autowired
	private int id;

	/**
	 * text representation of country currency (example: euro)
	 */
	@Autowired
	private String currency;
	
	/**
	 * name of the country
	 */
	@Autowired
	private String name;

	/**
	 * currency code of the country
	 */
	@Autowired
	private String currencyCode;

	/**
	 * tax rate of the country
	 */
	@Autowired
	private int tax;

	/**
	 * fixed cost of business in the country
	 */
	@Autowired
	private int fixedCost;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
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

	public String getCurrencyCode() {
		return currencyCode;
	}

	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}
}
