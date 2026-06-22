import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { StarRating } from './StarRating';
import { PhotoUpload } from './PhotoUpload';
import { createReview } from '../../lib/reviews';
import { uploadReviewPhotos } from '../../lib/uploadReviewPhotos';

interface FormErrors {
  clientName?: string;
  rating?: string;
  comment?: string;
}

export function ReviewForm() {
  const { t } = useTranslation();

  const [clientName, setClientName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!clientName.trim()) nextErrors.clientName = t('validation.required');
    if (rating === 0) nextErrors.rating = t('validation.selectRating');
    if (!comment.trim()) nextErrors.comment = t('validation.required');

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      const photoUrls = await uploadReviewPhotos([]);
      await createReview({ clientName: clientName.trim(), rating, comment: comment.trim(), photoUrls });
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mt-12 rounded-2xl bg-card p-8 text-center">
        <p className="text-lg text-teal">{t('reviews.pendingModeration')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 mx-auto max-w-xl rounded-2xl bg-card p-8">
      <h3 className="text-2xl text-cream">{t('reviews.leaveReview')}</h3>

      <div className="mt-6 flex flex-col gap-6">
        <Input
          label={t('reviews.name')}
          name="clientName"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          error={errors.clientName}
        />

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-cream">{t('reviews.rating')}</span>
          <StarRating value={rating} onChange={setRating} />
          {errors.rating && <p className="text-sm text-coral">{errors.rating}</p>}
        </div>

        <Textarea
          label={t('reviews.comment')}
          name="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          error={errors.comment}
        />

        <PhotoUpload />

        {submitError && <p className="text-sm text-coral">{t('reviews.submitError')}</p>}

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? t('reviews.submitting') : t('reviews.submit')}
        </Button>
      </div>
    </form>
  );
}
