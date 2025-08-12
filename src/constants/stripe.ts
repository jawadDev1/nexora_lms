// stripe/appearance.ts
import { Appearance } from "@stripe/stripe-js";

export const stripeAppearance: Appearance = {
  theme: "night",

  variables: {
    // Colors matching your theme
    colorPrimary: "#FFDE00",
    colorBackground: "#1D1D1F",
    colorText: "#ffffff",
    colorDanger: "#FF0000",
    colorSuccess: "#22C55E",
    colorWarning: "#FFDE00",

    // Text colors
    colorTextSecondary: "#797979",
    colorTextPlaceholder: "#797979",

    // Typography
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    // fontSize: "16px",
    fontSizeBase: "16px",
    fontWeightNormal: "400",
    fontWeightMedium: "500",
    fontWeightBold: "600",

    // Spacing and sizing
    spacingUnit: "4px",
    borderRadius: "8px",
    focusBoxShadow: "0 0 0 2px rgba(255, 222, 0, 0.2)",
    focusOutline: "none",

    // Grid and layout
    spacingGridRow: "16px",
    spacingGridColumn: "16px",
    spacingTab: "12px",

    // Icon colors
    colorIcon: "#797979",
    colorIconHover: "#FFDE00",
  },

  rules: {
    ".Container": {
      backgroundColor: "#242424",
      border: "1px solid #797979",
      borderRadius: "8px",
      padding: "16px",
      transition: "all 0.2s ease",
    },

    ".Container:hover": {
      borderColor: "#FFDE00",
    },

    ".Container:focus-within": {
      borderColor: "#FFDE00",
      boxShadow: "0 0 0 2px rgba(255, 222, 0, 0.2)",
    },

    // Tab styles for payment methods
    ".Tab": {
      backgroundColor: "#1D1D1F",
      border: "1px solid #797979",
      borderRadius: "6px",
      color: "#ffffff",
      padding: "12px 16px",
      transition: "all 0.2s ease",
    },

    ".Tab:hover": {
      backgroundColor: "#242424",
      borderColor: "#FFDE00",
    },

    ".Tab--selected": {
      backgroundColor: "#FFDE00",
      borderColor: "#FFDE00",
      color: "#1D1D1F",
      fontWeight: "600",
    },

    ".Tab--selected:hover": {
      backgroundColor: "#FFE433",
    },

    // Input field styles
    ".Input": {
      backgroundColor: "transparent",
      border: "1px solid white",
      color: "#ffffff",
      fontSize: "16px",
      padding: "12px 10px",
    },

    ".Input::placeholder": {
      color: "#797979",
    },

    ".Input:focus": {
      outline: "none",
    },

    ".Input--invalid": {
      color: "#FF0000",
    },

    // Label styles
    ".Label": {
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "6px",
      textTransform: "none",
    },

    ".Label--required": {
      color: "#ffffff",
    },

    ".Label--required::after": {
      content: '" *"',
      color: "#FF0000",
    },

    // Error message styles
    ".Error": {
      color: "#FF0000",
      fontSize: "14px",
      marginTop: "6px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },

    ".Error::before": {
      content: '"⚠"',
      fontSize: "12px",
    },

    // Success message styles
    ".Success": {
      color: "#22C55E",
      fontSize: "14px",
      marginTop: "6px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },

    ".Success::before": {
      content: '"✓"',
      fontSize: "12px",
    },

    // Loading spinner
    ".Spinner": {
      color: "#FFDE00",
      width: "20px",
      height: "20px",
    },

    // Payment method icons
    ".PaymentMethodIcon": {
      filter: "brightness(0) invert(1)", // Make icons white
    },

    ".PaymentMethodIcon--selected": {
      filter: "brightness(0)", // Make selected icons black
    },

    // Link Authentication Element
    ".LinkAuthenticationElement": {
      marginBottom: "16px",
    },

    // Payment Element specific
    ".PaymentElement": {
      marginBottom: "16px",
    },

    // Accordion for additional payment details
    ".Accordion": {
      backgroundColor: "#1D1D1F",
      border: "1px solid #797979",
      borderRadius: "6px",
      marginTop: "12px",
    },

    ".AccordionHeader": {
      backgroundColor: "transparent",
      color: "#ffffff",
      padding: "12px 16px",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },

    ".AccordionHeader:hover": {
      backgroundColor: "#242424",
    },

    ".AccordionContent": {
      padding: "16px",
      borderTop: "1px solid #797979",
      backgroundColor: "#242424",
    },

    // Terms and links
    ".TermsText": {
      color: "#797979",
      fontSize: "12px",
      textAlign: "center",
      marginTop: "16px",
    },

    ".TermsText a": {
      color: "#FFDE00",
      textDecoration: "underline",
    },

    ".TermsText a:hover": {
      color: "#FFE433",
    },
    ".p-HeightObserverProvider-container": {
      margin: "5rem",
    },
  },

  labels: "above",
};
