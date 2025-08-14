import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Blog Post';
    const description = searchParams.get('description') || '';
    const tags = searchParams.get('tags')?.split(',') || [];
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#2f2f2f',
            backgroundImage: 'linear-gradient(135deg, #2f2f2f 0%, #1a1a1a 100%)',
            padding: '80px',
            color: '#fafafa',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '60px',
                backgroundColor: '#ea580c',
                marginRight: '20px',
                borderRadius: '4px',
              }}
            />
            <div
              style={{
                fontSize: '32px',
                fontWeight: '600',
                color: '#d1d5db',
              }}
            >
              cxalem.blog
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: title.length > 50 ? '60px' : '72px',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '30px',
              maxWidth: '90%',
              background: 'linear-gradient(90deg, #ffffff 0%, #fed7aa 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              style={{
                fontSize: '28px',
                color: '#d1d5db',
                lineHeight: '1.4',
                marginBottom: '40px',
                maxWidth: '85%',
              }}
            >
              {description.length > 120 
                ? description.substring(0, 120) + '...' 
                : description}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              {tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#ea580c',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    fontSize: '20px',
                    fontWeight: '500',
                  }}
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e instanceof Error ? e.message : 'Unknown error'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 