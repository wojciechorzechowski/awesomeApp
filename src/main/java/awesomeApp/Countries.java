package awesomeApp;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Represent countriesArray
 * 
 * @author orzech
 *
 */
public class Countries {

	private Log log = LogFactory.getLog(Countries.class);

	public Countries() {
		if (log.isInfoEnabled()) {
			log.info("In Country constructor");
		}

	}

	/**
	 * One and only property of Countries 
	 */
	@Autowired
	private Country[] countriesArray;

	public Country[] getCountriesArray() {
		return countriesArray;
	}

	public void setCountriesArray(Country[] countries) {
		this.countriesArray = countries;
	}

}
