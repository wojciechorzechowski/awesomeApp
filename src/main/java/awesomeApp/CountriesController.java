package awesomeApp;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CountriesController {

	private Log log = LogFactory.getLog(CountriesController.class);

	private ApplicationContext appContext = new ClassPathXmlApplicationContext("App.xml");
	CountriesProvider converter = (CountriesProvider) appContext.getBean("CountriesProvider");

	private Countries getCountries() {
		try {
			return converter.getCountries();
		} catch (Exception e) {
			log.error("Unable to convert xml contents to Countries", e);
			return null;
		}
	}

	/**
	 * Serving /countries requests
	 * @return array of Country
	 */
	@RequestMapping("/countries")
	public @ResponseBody Object Object() {
		if (log.isInfoEnabled()) {
			log.info("New request for " + this.getClass().getName());
		}
		//TODO:remove id from country, id should be set here, or while creation, to have it unique 
		return this.getCountries().getCountriesArray();
	}
}