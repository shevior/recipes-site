import { Form, FormField, Radio } from 'semantic-ui-react';
import React, { useState } from 'react';

const Language = () => {

    const languageOptions = [
        { key: 'en', value: 'english', text: 'English' },
        { key: 'fr', value: 'french', text: 'French' },
        { key: 'he', value: 'hebrew', text: 'Hebrew' },
    ];
    const [language, setLanguage] = useState('en');

    const handleLanguageChange = (e, { value }) => {
        setLanguage(value);
    };

    return (
        <Form>
        <Form.Field>
          <label>select language:</label>
          <Form.Radio
            label="english"
            value="en"
            checked={language === 'en'}
            onChange={handleLanguageChange}
          />
          <Form.Radio
            label="french"
            value="fr"
            checked={language === 'fr'}
            onChange={handleLanguageChange}
          />
        </Form.Field>
      </Form>
    );
}

export default Language;
