import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("dQoiMB-gl_XYU--Dc");

export const sendEmail = async (templateParams: Record<string, unknown>) => {
  try {
    console.log('Sending email with params:', templateParams);
    const response = await emailjs.send(
      "service_2r7r3ca",
      "template_v2rscvi",
      templateParams,
      "dQoiMB-gl_XYU--Dc"
    );
    console.log('EmailJS Response:', response);
    return response;
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
  }
}; 