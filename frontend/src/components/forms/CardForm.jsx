import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FormField from './FormField';
import { validateCardForm } from '../../utils/validation';
import { CARD_CATEGORIES } from '../../utils/constants';

const CardForm = ({ 
  initialData = {}, 
  onSubmit, 
  loading = false, 
  submitText,
  mode = 'create' // 'create' or 'edit'
}) => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: {
      url: '',
      alt: ''
    },
    address: {
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: ''
    },
    category: CARD_CATEGORIES.BUSINESS,
    ...initialData
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        image: {
          url: '',
          alt: '',
          ...initialData.image
        },
        address: {
          state: '',
          country: '',
          city: '',
          street: '',
          houseNumber: '',
          zip: '',
          ...initialData.address
        }
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    const validation = validateCardForm(formData);
    if (!validation.isValid && validation.errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validation.errors[name]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateCardForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched(Object.keys(validation.errors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}));
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const categoryOptions = [
    { value: CARD_CATEGORIES.BUSINESS, label: t('categories.business') },
    { value: CARD_CATEGORIES.TECHNOLOGY, label: t('categories.technology') },
    { value: CARD_CATEGORIES.HEALTHCARE, label: t('categories.healthcare') },
    { value: CARD_CATEGORIES.EDUCATION, label: t('categories.education') },
    { value: CARD_CATEGORIES.CREATIVE, label: t('categories.creative') },
    { value: CARD_CATEGORIES.LEGAL, label: t('categories.legal') },
    { value: CARD_CATEGORIES.FINANCE, label: t('categories.finance') },
    { value: CARD_CATEGORIES.RESTAURANT, label: t('categories.restaurant') },
    { value: CARD_CATEGORIES.FITNESS, label: t('categories.fitness') },
    { value: CARD_CATEGORIES.BEAUTY, label: t('categories.beauty') },
    { value: CARD_CATEGORIES.REAL_ESTATE, label: t('categories.realEstate') },
    { value: CARD_CATEGORIES.AUTOMOTIVE, label: t('categories.automotive') }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="card-form">
      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('cards.basicInformation')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={t('cards.title')}
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title ? errors.title : ''}
            required
            placeholder={t('cards.titlePlaceholder')}
            data-testid="card-title-input"
          />
          
          <FormField
            label={t('cards.subtitle')}
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.subtitle ? errors.subtitle : ''}
            required
            placeholder={t('cards.subtitlePlaceholder')}
            data-testid="card-subtitle-input"
          />
        </div>

        <FormField
          label={t('cards.description')}
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description ? errors.description : ''}
          required
          placeholder={t('cards.descriptionPlaceholder')}
          rows={4}
          data-testid="card-description-input"
        />

        <FormField
          label={t('cards.category')}
          name="category"
          type="select"
          value={formData.category}
          onChange={handleChange}
          onBlur={handleBlur}
          options={categoryOptions}
          required
        />
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('cards.contactInformation')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={t('cards.phone')}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone ? errors.phone : ''}
            required
            placeholder={t('cards.phonePlaceholder')}
            data-testid="card-phone-input"
          />
          
          <FormField
            label={t('cards.email')}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : ''}
            required
            placeholder={t('cards.emailPlaceholder')}
            data-testid="card-email-input"
          />
        </div>

        <FormField
          label={t('cards.website')}
          name="web"
          type="url"
          value={formData.web}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.web ? errors.web : ''}
          placeholder={t('cards.websitePlaceholder')}
          data-testid="card-web-input"
        />
      </div>

      {/* Image */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('cards.image')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={t('cards.imageUrl')}
            name="image.url"
            type="url"
            value={formData.image?.url || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['image.url'] ? errors.imageUrl : ''}
            placeholder={t('cards.imageUrlPlaceholder')}
            data-testid="card-image-url-input"
          />
          
          <FormField
            label={t('cards.imageAlt')}
            name="image.alt"
            value={formData.image?.alt || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={t('cards.imageAltPlaceholder')}
            data-testid="card-image-alt-input"
          />
        </div>
      </div>

      {/* Address */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('cards.address')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={t('cards.state')}
            name="address.state"
            value={formData.address?.state || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.state'] ? errors.state : ''}
            required
            placeholder={t('cards.statePlaceholder')}
            data-testid="card-state-input"
          />
          
          <FormField
            label={t('cards.country')}
            name="address.country"
            value={formData.address?.country || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.country'] ? errors.country : ''}
            required
            placeholder={t('cards.countryPlaceholder')}
            data-testid="card-country-input"
          />
          
          <FormField
            label={t('cards.city')}
            name="address.city"
            value={formData.address?.city || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.city'] ? errors.city : ''}
            required
            placeholder={t('cards.cityPlaceholder')}
            data-testid="card-city-input"
          />
          
          <FormField
            label={t('cards.street')}
            name="address.street"
            value={formData.address?.street || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.street'] ? errors.street : ''}
            required
            placeholder={t('cards.streetPlaceholder')}
            data-testid="card-street-input"
          />
          
          <FormField
            label={t('cards.houseNumber')}
            name="address.houseNumber"
            value={formData.address?.houseNumber || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.houseNumber'] ? errors.houseNumber : ''}
            required
            placeholder={t('cards.houseNumberPlaceholder')}
            data-testid="card-houseNumber-input"
          />
          
          <FormField
            label={t('cards.zipCode')}
            name="address.zip"
            value={formData.address?.zip || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.zip'] ? errors.zip : ''}
            required
            placeholder={t('cards.zipCodePlaceholder')}
            data-testid="card-zip-input"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          data-testid="submit-button"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t('common.loading')}
            </div>
          ) : (
            submitText || (mode === 'edit' ? t('cards.updateCard') : t('cards.createCard'))
          )}
        </button>
      </div>
    </form>
  );
};

export default CardForm;
