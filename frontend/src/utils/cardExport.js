// Utilities for exporting cards in various formats

export const generateVCard = (card) => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${card.title}
ORG:${card.company || ''}
TITLE:${card.subtitle || card.position || ''}
EMAIL:${card.email}
TEL:${card.phone || ''}
URL:${card.website || ''}
ADR:;;${card.address || ''};;;;
NOTE:${card.description || ''}
END:VCARD`;

  return vcard;
};

export const downloadVCard = (card) => {
  const vcard = generateVCard(card);
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${card.title.replace(/\s+/g, '_')}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const generateCardJSON = (card) => {
  return JSON.stringify(card, null, 2);
};

export const downloadCardJSON = (card) => {
  const json = generateCardJSON(card);
  const blob = new Blob([json], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${card.title.replace(/\s+/g, '_')}_card.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const generateCardURL = (card) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/cards/${card._id || card.id}`;
};

export const shareCard = async (card) => {
  const cardUrl = generateCardURL(card);
  const shareData = {
    title: `Carte de ${card.title}`,
    text: `Découvrez la carte professionnelle de ${card.title}`,
    url: cardUrl,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(cardUrl);
      return { success: true, method: 'clipboard' };
    } catch (error) {
      return { success: false, error };
    }
  }
};

export const generateQRCodeData = (card) => {
  const vcard = generateVCard(card);
  return vcard;
};
