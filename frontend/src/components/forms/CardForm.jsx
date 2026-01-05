import { useState, useEffect } from 'react';
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
      const timer = setTimeout(() => {
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
      }, 0);
      return () => clearTimeout(timer);
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
    { value: CARD_CATEGORIES.BUSINESS, label: 'business' },
    { value: CARD_CATEGORIES.TECHNOLOGY, label: 'technology' },
    { value: CARD_CATEGORIES.HEALTHCARE, label: 'healthcare' },
    { value: CARD_CATEGORIES.EDUCATION, label: 'education' },
    { value: CARD_CATEGORIES.CREATIVE, label: 'creative' },
    { value: CARD_CATEGORIES.LEGAL, label: 'legal' },
    { value: CARD_CATEGORIES.FINANCE, label: 'finance' },
    { value: CARD_CATEGORIES.RESTAURANT, label: 'restaurant' },
    { value: CARD_CATEGORIES.FITNESS, label: 'fitness' },
    { value: CARD_CATEGORIES.BEAUTY, label: 'beauty' },
    { value: CARD_CATEGORIES.REAL_ESTATE, label: 'real Estate' },
    { value: CARD_CATEGORIES.AUTOMOTIVE, label: 'automotive' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="card-form">
      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {'basic Information'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={'Business Cards'}
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title ? errors.title : ''}
            required
            placeholder="Enter card title"
            data-testid="card-title-input"
          />
          
          <FormField
            label={'Discover amazing digital business cards'}
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.subtitle ? errors.subtitle : ''}
            required
            placeholder="Enter card subtitle"
            data-testid="card-subtitle-input"
          />
        </div>

        <FormField
          label={'description'}
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description ? errors.description : ''}
          required
          placeholder="Describe your business or services"
          rows={4}
          data-testid="card-description-input"
        />

        <FormField
          label={'category'}
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
          {'contact Information'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={'phone'}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone ? errors.phone : ''}
            required
            placeholder="Enter phone number"
            data-testid="card-phone-input"
          />
          
          <FormField
            label={'email'}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : ''}
            required
            placeholder="Enter email address"
            data-testid="card-email-input"
          />
        </div>

        <FormField
          label={'website'}
          name="web"
          type="url"
          value={formData.web}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.web ? errors.web : ''}
          placeholder="Enter website URL"
          data-testid="card-web-input"
        />
      </div>

      {/* Image */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {'image'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={'image Url'}
            name="image.url"
            type="url"
            value={formData.image?.url || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['image.url'] ? errors.imageUrl : ''}
            placeholder="Enter image URL"
            data-testid="card-image-url-input"
          />
          
          <FormField
            label={'image Alt'}
            name="image.alt"
            value={formData.image?.alt || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Image description"
            data-testid="card-image-alt-input"
          />
        </div>
      </div>

      {/* Address */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {'address'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={'state'}
            name="address.state"
            value={formData.address?.state || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.state'] ? errors.state : ''}
            required
            placeholder="Enter state/province"
            data-testid="card-state-input"
          />
          
          <FormField
            label={'country'}
            name="address.country"
            value={formData.address?.country || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.country'] ? errors.country : ''}
            required
            placeholder="Enter country"
            data-testid="card-country-input"
          />
          
          <FormField
            label={'city'}
            name="address.city"
            value={formData.address?.city || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.city'] ? errors.city : ''}
            required
            placeholder="Enter city"
            data-testid="card-city-input"
          />
          
          <FormField
            label={'street'}
            name="address.street"
            value={formData.address?.street || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.street'] ? errors.street : ''}
            required
            placeholder="Enter street name"
            data-testid="card-street-input"
          />
          
          <FormField
            label={'house Number'}
            name="address.houseNumber"
            value={formData.address?.houseNumber || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.houseNumber'] ? errors.houseNumber : ''}
            required
            placeholder="Enter house number"
            data-testid="card-houseNumber-input"
          />
          
          <FormField
            label={'zip Code'}
            name="address.zip"
            value={formData.address?.zip || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched['address.zip'] ? errors.zip : ''}
            required
            placeholder="Enter ZIP code"
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
              {'Loading...'}
            </div>
          ) : (
            submitText || (mode === 'edit' ? 'update Card' : 'create Card')
          )}
        </button>
      </div>
    </form>
  );
};

export default CardForm;
