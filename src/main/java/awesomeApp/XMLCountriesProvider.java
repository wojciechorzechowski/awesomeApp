package awesomeApp;

import java.io.FileInputStream;
import java.io.IOException;

import javax.xml.transform.stream.StreamSource;

import org.springframework.oxm.Marshaller;
import org.springframework.oxm.Unmarshaller;

/**
 * Provides Countries object unmarshalled from xml file
 * 
 * @author orzech
 *
 */
public class XMLCountriesProvider implements CountriesProvider {

	private Marshaller marshaller;
	private Unmarshaller unmarshaller;
	private String XMLFileName;

	/**
	 * Default constructor
	 * 
	 * @param xmlFileName
	 *            XML file containing countries configuration (can be with file
	 *            path)
	 */
	public XMLCountriesProvider(String XMLFileName) {
		this.XMLFileName = XMLFileName;
	}

	public Marshaller getMarshaller() {
		return marshaller;
	}

	public void setMarshaller(Marshaller marshaller) {
		this.marshaller = marshaller;
	}

	public Unmarshaller getUnmarshaller() {
		return unmarshaller;
	}

	public void setUnmarshaller(Unmarshaller unmarshaller) {
		this.unmarshaller = unmarshaller;
	}

	/**
	 * returns Countries object unmarshalled form XML file
	 */
	public Countries getCountries() throws IOException {

		FileInputStream is = null;
		ClassLoader classLoader = getClass().getClassLoader();
		
		try {
			is = new FileInputStream(classLoader.getResource(this.XMLFileName).getFile());
			return (Countries) getUnmarshaller().unmarshal(new StreamSource(is));
		} finally {
			if (is != null) {
				is.close();
			}
		}
	}

}
