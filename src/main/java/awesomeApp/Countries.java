package awesomeApp;

import java.util.List;

import javax.xml.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;

//@XmlRootElement(name = "countries")
//@XmlSeeAlso({Country.class})
public class Countries {

 public Countries(){
	 System.out.println("==== in Countries ====");
 }
@Autowired
private Country[] countries;

 //@XmlElementWrapper(name="country")
 //@XmlElementRef()
 public Country[] getCountries() {
  return countries;
 }
 
 public void setCountries(Country[] countries){
	 this.countries = countries;
 }

 
}

