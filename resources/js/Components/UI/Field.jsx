/**
 * Form field wrapper for the public site — label, help text, control, error.
 *
 * Takes a render function, not plain children, and hands it every attribute the
 * control needs: id, className (including the error state) and the ARIA wiring
 * that links the input to its error message. That is deliberate — when this
 * accepted plain children too, it was possible to render a field whose error
 * was visible but never announced to a screen reader. Now there is one way to
 * use it and it is the correct one.
 *
 *   <Field id="name" label="Your name" required error={errors.name}>
 *       {(field) => <input {...field} type="text" value={...} onChange={...} />}
 *   </Field>
 *
 * Breeze's own input components are untouched and still serve the admin and auth
 * screens.
 */

/** Shared classes for input, textarea and select, so all three sit identically. */
export const controlClasses =
    'block w-full rounded border-slate-300 text-slate-900 placeholder:text-slate-400 ' +
    'focus:border-teal-600 focus:ring-teal-600 disabled:bg-slate-50 disabled:text-slate-500';

export const controlErrorClasses =
    'border-red-400 focus:border-red-500 focus:ring-red-500';

export default function Field({
    id,
    label,
    error,
    help,
    required = false,
    className = '',
    children,
}) {
    const helpId = help ? `${id}-help` : null;
    const errorId = error ? `${id}-error` : null;

    const describedBy = [errorId, helpId].filter(Boolean).join(' ');

    return (
        <div className={className}>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-navy-900"
            >
                {label}
                {required ? (
                    <span className="ml-1 text-teal-700" aria-hidden="true">
                        *
                    </span>
                ) : (
                    <span className="ml-2 text-xs font-normal text-slate-400">
                        optional
                    </span>
                )}
            </label>

            {help && (
                <p id={helpId} className="mt-1 text-xs text-slate-500">
                    {help}
                </p>
            )}

            <div className="mt-2">
                {children({
                    id,
                    className: `${controlClasses} ${error ? controlErrorClasses : ''}`,
                    required: required || undefined,
                    'aria-invalid': error ? true : undefined,
                    'aria-describedby': describedBy || undefined,
                })}
            </div>

            {error && (
                <p id={errorId} className="mt-2 text-sm text-red-700">
                    {error}
                </p>
            )}
        </div>
    );
}
