import { useState } from 'react';
import type { Review } from '../types';
import ReviewForm from './ReviewForm';
import ReviewItem from './ReviewItem';
import { Star } from 'lucide-react';


interface ReviewSectionProps {
    dappId: string;
    packageId?: string | null;
    reviews: Review[];
    rating: number;
    reviewCount: number;
    onReviewSubmitted?: (review: { rating: number; title: string; content: string; verified: boolean }) => void;
}

export default function ReviewSection({ dappId, packageId, reviews, rating, reviewCount, onReviewSubmitted }: ReviewSectionProps) {
    const [sortBy] = useState<'recent' | 'helpful'>('recent');

    // Calculate rating distribution
    const distribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => Math.round(r.rating) === star).length;
        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
        return { star, count, percentage };
    });

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === 'recent') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return b.helpful - a.helpful;
    });

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-neo-black">Ratings and reviews</h2>

            <div className="flex flex-col gap-8 items-start">
                {/* Rating Summary */}
                <div className="w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 neo-box p-6 bg-white">
                        <div className="text-center sm:text-left flex-shrink-0">
                            <div className="text-6xl font-black text-neo-black mb-1">{rating.toFixed(1)}</div>
                            <div className="flex justify-center sm:justify-start mb-1 space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.round(rating) ? 'text-neo-black fill-neo-black' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <div className="text-sm font-bold uppercase text-gray-500">{reviewCount} reviews</div>
                        </div>

                        <div className="flex-1 w-full space-y-2">
                            {distribution.map(({ star, percentage }) => (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-neo-black w-3">{star}</span>
                                    <div className="flex-1 h-4 bg-neo-white border-2 border-neo-black">
                                        <div
                                            className="h-full bg-neo-green border-r-2 border-neo-black"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Review Form & List */}
                <div className="w-full space-y-6">
                    <ReviewForm dappId={dappId} packageId={packageId} onReviewSubmitted={onReviewSubmitted} />

                    <div className="space-y-6">
                        {sortedReviews.map((review) => (
                            <ReviewItem key={review.id} review={review} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
