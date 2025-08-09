import { MessageSection } from '@/i18n/config'
import { createTranslator } from 'next-intl'

/**
 * Creates a scoped translator function that prefixes keys with a specific section
 * @param t The original translator function
 * @param section The section name to prefix keys with
 * @returns A scoped translator function
 */
export function createScopedTranslator(messages: Record<string, unknown>, section: MessageSection) {
  // Create a translator with the entire messages object
  const translator = createTranslator({ locale: 'en', messages, namespace: section })

  // Return a function that uses the section namespace
  return translator
}
