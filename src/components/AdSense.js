import { useEffect } from 'react';

/**
 * AdSense component for displaying Google Ads
 * @param {string} adSlot - Google AdSense ad slot ID
 * @param {string} adFormat - Ad format (default: 'auto')
 * @param {boolean} fullWidthResponsive - Enable full width responsive ads
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} AdSense ad unit
 */
const AdSense = ({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  className = ''
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8321717503736662"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

export default AdSense;
