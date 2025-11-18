import React, { useState } from "react";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // einfache Formularzustände
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function resetErrors() {
    setFormError(null);
  }

  function validateEmail(e: string) {
    // sehr einfache Email-Prüfung
    return /^\S+@\S+\.\S+$/.test(e);
  }

  function validatePasswordStrength(pw: string) {
    // returns 0..3
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetErrors();

    // client-side validation
    if (!validateEmail(email)) {
      setFormError("Bitte gib eine gültige E‑Mail-Adresse ein.");
      return;
    }

    if (password.length < 6) {
      setFormError("Das Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    if (mode === "register") {
      if (!name.trim()) {
        setFormError("Bitte gib deinen Namen an.");
        return;
      }
      if (password !== confirmPassword) {
        setFormError("Passwörter stimmen nicht überein.");
        return;
      }
      const strength = validatePasswordStrength(password);
      if (strength < 2) {
        setFormError("Das Passwort ist zu schwach. Verwende mindestens 8 Zeichen, Groß-/Kleinbuchstaben und Zahlen oder Sonderzeichen.");
        return;
      }
    }

    setLoading(true);
    try {
      // Hier würdest du API-Aufruf machen (fetch / axios).
      // Wir simulieren kurz eine Wartezeit.
      await new Promise((res) => setTimeout(res, 700));

      if (mode === "login") {
        // Beispiel: erfolgreiche Anmeldung
        alert(`Erfolgreich angemeldet als ${email}`);
      } else {
        alert(`Account erstellt für ${name} (${email})`);
      }

      // nach erfolgreichem Vorgang Formular zurücksetzen
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
    } catch (err) {
      setFormError("Beim Verarbeiten ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left: Illustration / Info */}
        <div className="hidden md:flex flex-col justify-center p-8 bg-gradient-to-br from-indigo-600 to-violet-500 text-white">
          <h2 className="text-3xl font-bold mb-2">Willkommen zurück!</h2>
          <p className="opacity-90 mb-6">Melde dich an oder erstelle ein neues Konto, um Zugriff auf geschützte Bereiche zu erhalten.</p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="font-bold">Sicher</span>
              <span className="text-sm opacity-90">Zwei-Faktor-Unterstützung & moderne Kryptographie.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold">Schnell</span>
              <span className="text-sm opacity-90">Leichtgewichtiges Frontend, optimiert für Performance.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold">Responsiv</span>
              <span className="text-sm opacity-90">Funktioniert auf Desktop & Mobilgeräten gleich gut.</span>
            </li>
          </ul>

          <p className="mt-6 text-xs opacity-80">Dieses Beispiel ist vollständig in TSX geschrieben und verwendet Tailwind‑Klassen.</p>
        </div>

        {/* Right: Form */}
        <div className="p-8 flex flex-col justify-center">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{mode === "login" ? "Login" : "Registrierung"}</h1>
              <p className="text-sm opacity-80">{mode === "login" ? "Melde dich mit deiner E‑Mail an." : "Erstelle ein neues Konto."}</p>
            </div>
            <div>
              <button
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50"
                aria-pressed={mode === "register"}
              >
                {mode === "login" ? "Zum Registrieren" : "Zum Login"}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Dein voller Name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">E‑Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="name@beispiel.de"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Passwort</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Mind. 8 Zeichen"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm opacity-70 px-2 py-1 rounded"
                >
                  {showPassword ? "Verbergen" : "Anzeigen"}
                </button>
              </div>

              {/* Passwortstärke */}
              <div className="mt-2 text-xs">
                <PasswordStrengthMeter pw={password} />
              </div>
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium mb-1">Passwort bestätigen</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Passwort wiederholen"
                  required
                />
              </div>
            )}

            {formError && <div className="text-sm text-red-600">{formError}</div>}

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" />
                <span className="opacity-80">Angemeldet bleiben</span>
              </label>

              {mode === "login" && (
                <a href="#" className="text-sm underline opacity-80">
                  Passwort vergessen?
                </a>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md py-2 font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? "Bitte warten..." : mode === "login" ? "Einloggen" : "Registrieren"}
              </button>
            </div>

            <div className="pt-2">
              <div className="text-center text-sm opacity-80">Oder mit</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button type="button" className="rounded-md border px-3 py-2 text-sm">Mit Google</button>
                <button type="button" className="rounded-md border px-3 py-2 text-sm">Mit GitHub</button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-xs opacity-80">
            <p>
              Durch Fortfahren erklärst du dich mit unseren <a href="#" className="underline">Nutzungsbedingungen</a> und der <a href="#" className="underline">Datenschutzerklärung</a> einverstanden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Hilfs-Komponenten (klein und in-file)
// -----------------------------

function PasswordStrengthMeter({ pw }: { pw: string }) {
  const score = (() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
    if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  })();

  const labels = ["Sehr schwach", "Schwach", "Gut", "Stark"];
  const width = (score / 3) * 100 || 4;

  return (
    <div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-200`} 
          style={{ width: `${width}%`, background: score >= 3 ? "#059669" : score === 2 ? "#f59e0b" : "#ef4444" }}
        />
      </div>
      <div className="mt-1 text-xs opacity-80">{pw ? labels[score] : "Noch kein Passwort eingegeben"}</div>
    </div>
  );
}
