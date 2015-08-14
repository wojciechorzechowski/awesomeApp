package awesomeApp;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CountriesController {

    private static final String template = "Hello, %s!";
    //private final AtomicLong counter = new AtomicLong();

    private ApplicationContext appContext = new ClassPathXmlApplicationContext("App.xml");
    XMLCountries converter = (XMLCountries) appContext.getBean("XMLCountries");
    
    private Countries countries = getCountries();
    
    private Countries getCountries(){
    	try{
    		return(Countries) converter.convertFromXMLToObject();
    	}
    	catch (Exception e) {
    		System.out.println("==== fuck====");
    		return null;
    	}
    }
    		
    
    @RequestMapping("/countries")
    public @ResponseBody Object Country(
            @RequestParam(value="name", required=false, defaultValue="World") String name) {
    	System.out.println("==== in greeting ====");
 //
    	//return null;
        return this.countries.getCountries();
    }
}